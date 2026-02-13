import helmet from "helmet";
export const helmetConfig = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },

  // Prevent clickjacking
  frameguard: { action: "deny" },

  // Hide X-Powered-By
  hidePoweredBy: true,

  // Prevent MIME sniffing
  noSniff: true,

  // XSS protection (legacy browsers)
  xssFilter: true,

  // Enforce HTTPS (only in production)
  hsts:
    process.env.NODE_ENV === "production"
      ? {
          maxAge: 31536000, // 1 year
          includeSubDomains: true,
          preload: true,
        }
      : false,

  // Referrer policy
  referrerPolicy: { policy: "no-referrer" },
});
