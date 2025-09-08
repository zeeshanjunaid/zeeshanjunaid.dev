import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: NextRequest) => string; // Custom key generator
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// In-memory store for rate limiting (in production, use Redis)
const store = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(config: RateLimitConfig) {
  const { windowMs, maxRequests, keyGenerator } = config;

  return async (req: NextRequest): Promise<RateLimitResult> => {
    const key = keyGenerator ? keyGenerator(req) : getDefaultKey(req);
    const now = Date.now();
    const resetTime = now + windowMs;

    // Clean up expired entries
    for (const [k, v] of store.entries()) {
      if (v.resetTime < now) {
        store.delete(k);
      }
    }

    const current = store.get(key);

    if (!current) {
      // First request in window
      store.set(key, { count: 1, resetTime });
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: resetTime,
      };
    }

    if (current.resetTime < now) {
      // Window expired, reset
      store.set(key, { count: 1, resetTime });
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: resetTime,
      };
    }

    if (current.count >= maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        reset: current.resetTime,
        retryAfter: Math.ceil((current.resetTime - now) / 1000),
      };
    }

    // Increment counter
    current.count++;
    store.set(key, current);

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - current.count,
      reset: current.resetTime,
    };
  };
}

function getDefaultKey(req: NextRequest): string {
  // Use IP address as default key
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown';
  return `rate_limit:${ip}`;
}

// Predefined rate limiters
export const commentRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 comments per minute
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    const userId = req.headers.get('x-user-id');
    if (userId) {
      return `comment:user:${userId}`;
    }
    return `comment:ip:${getDefaultKey(req)}`;
  },
});

export const likeRateLimit = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  maxRequests: 10, // 10 likes per 10 seconds
  keyGenerator: (req) => {
    const userId = req.headers.get('x-user-id');
    if (userId) {
      return `like:user:${userId}`;
    }
    return `like:ip:${getDefaultKey(req)}`;
  },
});

export const reportRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5, // 5 reports per hour
  keyGenerator: (req) => {
    const userId = req.headers.get('x-user-id');
    if (userId) {
      return `report:user:${userId}`;
    }
    return `report:ip:${getDefaultKey(req)}`;
  },
});
