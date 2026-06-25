export const sanitizeText = (value: string): string => {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateName = (name: string): boolean => {
  const sanitized = sanitizeText(name);
  return sanitized.length >= 2 && sanitized.length <= 100;
};

export const validateMessage = (message: string): boolean => {
  const sanitized = sanitizeText(message);
  return sanitized.length >= 1 && sanitized.length <= 500;
};
