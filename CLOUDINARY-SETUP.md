# Cloudinary upload audit and setup

All file inputs use the Express backend and Cloudinary:

| Field | Route | Storage | Limit |
| --- | --- | --- | --- |
| Admin project image | POST /api/admin/uploads | portfolio/projects, image | 5 MB; resized and converted to WebP |
| Admin resume PDF | POST /api/admin/settings/resume | portfolio/resume, raw PDF | 10 MB |
| Contact attachment | POST /api/contact/attachments | portfolio/attachments, image or raw PDF | 5 MB; 5 requests per IP per hour |

Project and resume uploads require admin authentication. Contact attachments are public delivery URLs sent to Getform as `attachment_url`. They accept PDF, JPEG, PNG and WebP. Images are decoded and re-encoded; PDFs require a PDF signature. Previously saved media URLs are preserved. Existing assets are not automatically moved or deleted, and replaced resumes remain in the provider until manually cleaned up.

Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET on the backend host. Folder overrides are optional; see .env.example. Never prefix secrets with VITE_. Credentials are validated when uploading so missing storage configuration does not prevent server startup. Admin storage status checks configuration presence, not provider connectivity.

In Cloudinary Console Settings > Security, enable "Allow delivery of PDF and ZIP files" for resume and attachment PDF links on free accounts. See https://cloudinary.com/documentation/ts_how_to_upload_manage_and_deliver_pdf_files.

Deploy the Express backend and database alongside the frontend, or proxy /api/* from the frontend host to the backend. The current Vercel config publishes dist as a static SPA; it does not run Express. Adding Cloudinary variables alone to that static deployment cannot enable API uploads. Configure the API deployment/proxy before testing admin login and uploads.

After deployment, upload a project image, upload and open a resume PDF, then send a contact message with an attachment and verify its attachment_url in Getform. Invalid files and oversized files should be rejected. Cloudinary account connectivity requires production credentials; local builds do not upload files.

The aws directory contains historical S3/Lambda setup artifacts and is no longer used by the application.
