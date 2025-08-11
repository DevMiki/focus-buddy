import type { AuthSession, AuthSessionUpdate, NewAuthSession } from '$lib/types/database';
import { db } from '../db/db';

// GENERAL SESSION MANAGEMENT SECTION

export async function createAuthSession(session: NewAuthSession) {
    return await db.insertInto('auth_session')
        .values(session)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function findAuthSessionById(id: string) {
    return await db.selectFrom('auth_session')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
}

export async function findAuthSessionsByUserId(userId: number) {
    return await db.selectFrom('auth_session')
        .where('user_id', '=', userId)
        .selectAll()
        .execute();
}

export async function updateAuthSession(id: string, updates: AuthSessionUpdate) {
    return await db.updateTable('auth_session')
        .set(updates)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
}

export async function deleteAuthSession(id: string) {
    return await db.deleteFrom('auth_session')
        .where('id', '=', id)
        .executeTakeFirst();
}

export async function deleteExpiredAuthSessions() {
    const now = new Date();
    return await db.deleteFrom('auth_session')
        .where('expires_at', '<', now)
        .execute();
}

export async function deleteSessionIfExpired(session: AuthSession): Promise<void> {
    if (new Date() > session.expires_at) {
        await db.deleteFrom('auth_session').where('id', '=', session.id).execute();
    }
}