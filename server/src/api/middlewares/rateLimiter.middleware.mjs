import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute => 15 (minute) * 60 (second) * 1000 (miliseconds)
  max: 20, // the number of allowed request per window
  skipSuccessfulRequests: true,
});

export default authLimiter;
