# AWS S3 + Lambda Migration Guide

This guide explains how to set up AWS S3 for file storage and Lambda for image processing, replacing Cloudinary.

## Architecture

```
Admin Upload → Express Server → S3 Bucket → [Optional] Lambda Image Processor
                  ↓
              DB (resumeUrl, imagePublicId stored)
```

## Step 1: Create S3 Bucket

### AWS Console

1. Go to **S3** → **Create Bucket**
2. Name: `romano-lantano-portfolio` (or your choice)
3. Region: Same as your Render app (e.g., `us-east-1`)
4. Block Public Access: **Uncheck** "Block all public access" (to serve images publicly)
5. Create bucket

### Configure Bucket Policy (for public image serving)

1. Go to **Bucket** → **Permissions** → **Bucket Policy**
2. Add this policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::romano-lantano-portfolio/*"
    }
  ]
}
```

Replace `romano-lantano-portfolio` with your bucket name.

### Enable CORS (optional, for cross-origin requests)

1. Go to **Bucket** → **Permissions** → **CORS**
2. Add:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://romanolantano.online"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Step 2: Create IAM User for the App

1. Go to **IAM** → **Users** → **Create User**
2. Name: `romano-app-s3-user`
3. Skip tags
4. Create user

### Add S3 Permissions

1. Click the user → **Add Permissions** → **Attach inline policy**
2. Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::romano-lantano-portfolio/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::romano-lantano-portfolio"
    }
  ]
}
```

### Generate Access Keys

1. Go to **Security Credentials** tab
2. **Create Access Key** → Select "Application running outside AWS"
3. Copy `Access Key ID` and `Secret Access Key`

## Step 3: Set Environment Variables on Render

Add these to your Render service **Environment**:

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
S3_BUCKET_NAME=romano-lantano-portfolio
S3_PROJECTS_FOLDER=projects
S3_RESUME_FOLDER=resume
```

Then redeploy/restart the service.

## Step 4 (Optional): Set Up Lambda for Image Processing

If you want automatic image resizing/optimization:

### Create Lambda Function

1. Go to **Lambda** → **Create Function**
2. Name: `romano-image-processor`
3. Runtime: **Node.js 20.x**
4. Memory: **1024 MB**
5. Timeout: **60 seconds**
6. Create function

### Deploy Function Code

From `aws/lambda/image-processor/`:

```bash
npm install
npm run zip
# Upload function.zip via Lambda console or AWS CLI
```

### Add S3 Trigger

1. Go to function → **Add Trigger**
2. S3 bucket: `romano-lantano-portfolio`
3. Event types: `s3:ObjectCreated:*`
4. Prefix: `projects/` (only process project images)
5. Add

### Attach IAM Role

The Lambda execution role needs S3 permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::romano-lantano-portfolio/*"
    }
  ]
}
```

## Step 5: Update Code for CloudFront (Optional but Recommended)

For faster image delivery, set up **CloudFront** CDN:

1. Go to **CloudFront** → **Create Distribution**
2. Origin: Select your S3 bucket
3. Viewer protocol: Redirect HTTP to HTTPS
4. Create

Then update image URLs in code to use CloudFront domain:

```bash
# Instead of:
https://romano-lantano-portfolio.s3.us-east-1.amazonaws.com/...

# Use:
https://d123456789.cloudfront.net/...
```

## Testing

### Test Image Upload

1. Log in to admin panel
2. Upload a project image
3. Check S3 bucket → should see file in `/projects/` folder

### Test Resume Upload

1. Upload resume in Site Settings
2. Check S3 bucket → should see file in `/resume/` folder

### Verify Status Endpoint

```bash
curl https://romanolantano.online/api/admin/status
# Should show: "storage": { "configured": true, "bucket": "...", "region": "..." }
```

## Cleanup (Remove Cloudinary)

- Remove `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, etc. from env
- The app now uses AWS S3 only

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 403 Forbidden when accessing images | Check bucket policy allows public read access |
| Upload fails with "Access Denied" | Verify IAM user has `s3:PutObject` permission |
| Images not appearing | Ensure S3_BUCKET_NAME matches actual bucket name |
| High latency on image loads | Set up CloudFront CDN in front of S3 |

## Costs

- **S3**: ~$0.023/GB stored + $0.0004/1000 PUT requests
- **Lambda**: 1M free requests/month, then $0.20/1M
- **CloudFront** (optional): ~$0.085/GB delivered

For a portfolio with ~10 images (50MB total), expect ~$1-5/month.
