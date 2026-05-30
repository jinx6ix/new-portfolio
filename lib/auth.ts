import supabase from './supabase';
import { cookies } from 'next/headers';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';

const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7;
const PEPPER = process.env.PASSWORD_PEPPER || 'site-secret-pepper-2024';

function hashPassword(password: string): string {
  return createHash('sha256').update(password + PEPPER).digest('hex');
}

function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function createSession(adminId: string): Promise<string> {
  const sessionToken = `${adminId}-${randomBytes(32).toString('hex')}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION,
    path: '/',
  });

  return sessionToken;
}

export async function getSession(): Promise<{ id: string; username: string } | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

    if (!sessionToken) return null;

    const [adminId] = sessionToken.split('-');
    if (!adminId) return null;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, username')
      .eq('id', adminId)
      .maybeSingle();

    if (error || !admin) return null;

    return { id: admin.id, username: admin.username };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function verifyAdmin(username: string, password: string): Promise<{ id: string; username: string } | null> {
  try {
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, username, password')
      .eq('username', username)
      .maybeSingle();

    if (error || !admin) return null;

    const hashedInput = hashPassword(password);
    const hashedStored = admin.password;

    if (!timingSafeCompare(hashedInput, hashedStored)) return null;

    return { id: admin.id, username: admin.username };
  } catch {
    return null;
  }
}

export async function hashPasswordForStorage(password: string): Promise<string> {
  return hashPassword(password);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}