const { GetObjectCommand, PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const sharp = require('sharp');

const s3Client = new S3Client({ region: process.env.AWS_REGION });
const targetBucket = process.env.TARGET_BUCKET_NAME || process.env.S3_BUCKET_NAME;

exports.handler = async (event) => {
  const record = event.Records?.[0];
  if (!record) {
    return { statusCode: 200, body: 'No records received.' };
  }

  const sourceBucket = record.s3.bucket.name;
  const sourceKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

  if (sourceKey.includes('/processed/')) {
    return { statusCode: 200, body: 'Already processed.' };
  }

  const response = await s3Client.send(new GetObjectCommand({ Bucket: sourceBucket, Key: sourceKey }));
  const inputBuffer = await response.Body.transformToByteArray();

  const variants = [
    { name: 'thumbnail', width: 300, height: 300 },
    { name: 'medium', width: 800, height: 800 },
    { name: 'large', width: 1600, height: 1600 },
  ];

  for (const variant of variants) {
    const processedBuffer = await sharp(inputBuffer)
      .resize(variant.width, variant.height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const targetKey = sourceKey.replace(/\.[^.]+$/, `/${variant.name}.webp`);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: targetBucket,
        Key: targetKey,
        Body: processedBuffer,
        ContentType: 'image/webp',
        CacheControl: 'max-age=31536000, public',
      })
    );
  }

  return { statusCode: 200, body: 'Processed.' };
};
