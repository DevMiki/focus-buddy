import { db } from '../db/db';
import type { NewAuthUser, AuthUser, AuthUserUpdate } from '$lib/types/database';

/**
 * Creates a new user
 * @param user User data to insert
 * @returns Created user record
 */
export async function createAuthUser(user: NewAuthUser) {
    return await db.insertInto('auth_user')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow();
}

/**
 * Finds a user by their ID
 * @param id User ID
 * @returns User record or undefined if not found
 */
export async function findAuthUserById(id: number) {
    return await db.selectFrom('auth_user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
}

/**
 * Finds all users
 * @returns Array of user records
 */
export async function findAllAuthUsers() {
    return await db.selectFrom('auth_user')
        .selectAll()
        .execute();
}

/**
 * Updates a user by ID
 * @param id User ID to update
 * @param updates Fields to update
 * @returns Updated user record
 */
export async function updateAuthUser(id: number, updates: AuthUserUpdate) {
    return await db.updateTable('auth_user')
        .set(updates)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
}

/**
 * Deletes a user by ID
 * @param id User ID to delete
 */
export async function deleteAuthUser(id: number) {
    return await db.deleteFrom('auth_user')
        .where('id', '=', id)
        .executeTakeFirst();
}