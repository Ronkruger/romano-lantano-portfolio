import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env, requireServerSecret } from '../config/env.js';

type UploadToS3Options = {
  client: S3Client;
  bucketName: string;
  key: string;
  body: Buffer | Uint8Array | string;
  contentType: string;
  cacheControl?: string;
};

type DeleteFromS3Options = {
  client: S3Client;
  bucketName: string;
  key: string;
};

type SignedUrlOptions = {
  client: S3Client;
  bucketName: string;
  key: string;
  expiresIn?: number;
};

export const createS3Client = () =>
  new S3Client({
    region: env.awsRegion,
    credentials: {
      accessKeyId: requireServerSecret(env.awsAccessKeyId, 'AWS_ACCESS_KEY_ID'),
      secretAccessKey: requireServerSecret(env.awsSecretAccessKey, 'AWS_SECRET_ACCESS_KEY'),
    },
  });

export const getPublicS3Url = ({
  bucketName,
  key,
  region = env.awsRegion,
}: {
  bucketName: string;
  key: string;
  region?: string;
}) => `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

export const uploadBufferToS3 = async ({
  client,
  bucketName,
  key,
  body,
  contentType,
  cacheControl = 'max-age=31536000, public',
}: UploadToS3Options) => {
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    })
  );
};

export const deleteObjectFromS3 = async ({ client, bucketName, key }: DeleteFromS3Options) => {
  await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
};

export const getSignedDownloadUrl = async ({ client, bucketName, key, expiresIn = 300 }: SignedUrlOptions) => {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  return getSignedUrl(client, command, { expiresIn });
};
