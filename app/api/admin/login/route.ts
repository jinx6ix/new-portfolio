import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, createSession } from '@/lib/auth';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         'unknown';
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  const attempts = loginAttempts.get(clientIP);
  if (attempts && attempts.count >= MAX_ATTEMPTS) {
    const lockoutRemaining = LOCKOUT_TIME - (Date.now() - attempts.lastAttempt);
    if (lockoutRemaining > 0) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.', retryAfter: Math.ceil(lockoutRemaining / 1000) },
        { status: 429 }
      );
    }
  }

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (username.length > 50 || password.length > 100) {
      return NextResponse.json({ error: 'Invalid input length' }, { status: 400 });
    }

    const admin = await verifyAdmin(username.trim(), password);

    if (!admin) {
      const currentAttempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
      loginAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: Date.now(),
      });

      const remaining = MAX_ATTEMPTS - (currentAttempts.count + 1);
      if (remaining <= 0) {
        return NextResponse.json(
          { error: 'Too many login attempts. Account locked for 15 minutes.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `Invalid credentials. ${remaining} attempts remaining.` },
        { status: 401 }
      );
    }

    loginAttempts.delete(clientIP);

    await createSession(admin.id);

    return NextResponse.json({
      success: true,
      user: { id: admin.id, username: admin.username },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}