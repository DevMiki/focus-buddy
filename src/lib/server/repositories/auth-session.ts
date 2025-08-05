import { db } from '../db/db';
import type { NewAuthSession, AuthSession, AuthSessionUpdate } from '$lib/types/database';

/**
 * Creates a new authentication session
 * @param session Session data to insert
 * @returns Created session record
 */
export async function createAuthSession(session: NewAuthSession) {
    return await db.insertInto('auth_session')
        .values(session)
        .returningAll()
        .executeTakeFirstOrThrow();
}

/**
 * Finds an authentication session by its ID
 * @param id Session ID
 * @returns Session record or undefined if not found
 */
export async function findAuthSessionById(id: string) {
    return await db.selectFrom('auth_session')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
}

/**
 * Finds all authentication sessions for a user
 * @param userId User ID
 * @returns Array of session records
 */
export async function findAuthSessionsByUserId(userId: number) {
    return await db.selectFrom('auth_session')
        .where('user_id', '=', userId)
        .selectAll()
        .execute();
}

/**
 * Updates an authentication session by ID
 * @param id Session ID to update
 * @param updates Fields to update
 * @returns Updated session record
 */
export async function updateAuthSession(id: string, updates: AuthSessionUpdate) {
    return await db.updateTable('auth_session')
        .set(updates)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
}

/**
 * Deletes an authentication session by ID
 * @param id Session ID to delete
 */
export async function deleteAuthSession(id: string) {
    return await db.deleteFrom('auth_session')
        .where('id', '=', id)
        .executeTakeFirst();
}

/**
 * Deletes expired authentication sessions
 */
export async function deleteExpiredAuthSessions() {
    const now = new Date();
    return await db.deleteFrom('auth_session')
        .where('expires_at', '<', now)
        .execute();
}