import { env, requireServerSecret } from './config/env.js';
import { createApp } from './app.js';

// Validate required secrets at startup — fail fast before accepting any requests
requireServerSecret(env.jwtSecret, 'JWT_SECRET');
requireServerSecret(env.adminPasswordHash, 'ADMIN_PASSWORD_HASH');

const app = createApp();

app.listen(env.port, () => {
  console.log(`Portfolio server listening on port ${env.port}`);
});