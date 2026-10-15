// Run after npm run build: node --test tests/uploads.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Writable } from 'node:stream';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import sharp from 'sharp';

test('upload routes use Cloudinary and enforce authentication and file limits', async () => {
  process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud';
  process.env.CLOUDINARY_API_KEY = 'test-key';
  process.env.CLOUDINARY_API_SECRET = 'test-secret';
  process.env.JWT_SECRET = 'test-secret-for-local-upload-tests-only';
  const calls = [];
  const originalUpload = cloudinary.uploader.upload_stream;
  cloudinary.uploader.upload_stream = (options, callback) => new Writable({
    write(_chunk, _encoding, done) { done(); },
    final(done) {
      calls.push(options);
      callback(null, { public_id: `${options.folder}/${options.public_id}`, secure_url: 'https://res.cloudinary.com/test-cloud/test-asset' });
      done();
    },
  });
  const { prisma } = await import('../dist-server/db.js');
  const originalUpsert = prisma.siteSettings.upsert;
  prisma.siteSettings.upsert = async ({ update }) => update;
  const { createApp } = await import('../dist-server/app.js');
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const cookie = `portfolio_admin_token=${jwt.sign({ sub: 'admin' }, process.env.JWT_SECRET)}`;
  const send = (route, field, data, type, authenticated = false) => {
    const body = new FormData();
    body.append(field, new Blob([data], { type }), 'test-file');
    return fetch(base + route, { method: 'POST', body, headers: authenticated ? { Cookie: cookie } : {} });
  };
  try {
    const image = await sharp({ create: { width: 2, height: 2, channels: 3, background: '#ffffff' } }).png().toBuffer();
    assert.equal((await send('/api/admin/uploads', 'image', image, 'image/png')).status, 401);
    assert.equal(calls.length, 0);
    const result = await send('/api/admin/uploads', 'image', image, 'image/png', true);
    assert.equal(result.status, 201);
    assert.equal((await result.json()).imageUrl, 'https://res.cloudinary.com/test-cloud/test-asset');
    assert.equal(calls[0].resource_type, 'image');
    assert.equal(calls[0].folder, 'portfolio/projects');
    assert.equal((await send('/api/admin/settings/resume', 'resume', '%PDF-1.7\ntest', 'application/pdf', true)).status, 200);
    assert.equal(calls[1].resource_type, 'raw');
    assert.ok(calls[1].public_id.endsWith('.pdf'));
    assert.equal((await send('/api/contact/attachments', 'file', 'fake', 'application/pdf')).status, 400);
    assert.equal((await send('/api/contact/attachments', 'file', 'executable', 'application/octet-stream')).status, 400);
    assert.equal((await send('/api/contact/attachments', 'file', '%PDF-1.7\ntest', 'application/pdf')).status, 201);
    assert.equal(calls[2].folder, 'portfolio/attachments');
    assert.equal((await send('/api/contact/attachments', 'file', Buffer.alloc(5 * 1024 * 1024 + 1), 'image/png')).status, 400);
    await send('/api/contact/attachments', 'file', image, 'image/png');
    assert.equal((await send('/api/contact/attachments', 'file', image, 'image/png')).status, 429);
  } finally {
    await new Promise(resolve => server.close(resolve));
    cloudinary.uploader.upload_stream = originalUpload;
    prisma.siteSettings.upsert = originalUpsert;
    await prisma.$disconnect();
  }
});
