import type { AuthKey, AuthKeyUpdate, Database, NewAuthKey } from "$lib/types/database";
import type { Kysely } from "kysely";
import { db } from "../db/db";

export async function createAuthKey(authKey: NewAuthKey, dbInstance: Kysely<Database> = db): Promise<AuthKey> {
    return await db.insertInto('auth_key')
        .values(authKey)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function findAuthKeyByUserId(userId: number): Promise<AuthKey | undefined> {
    return await db.selectFrom('auth_key')
        .where('user_id', '=', userId)
        .selectAll()
        .executeTakeFirst();
}

export async function findAuthKeyById(id: number): Promise<AuthKey | undefined> {
    return await db.selectFrom('auth_key')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
}

export async function updateAuthKeyByUserId(userId: number, authKey: Partial<AuthKeyUpdate>): Promise<number> {
    const result = await db.updateTable('auth_key')
        .set(authKey)
        .where('user_id', '=', userId)
        .returning(['user_id'])
        .executeTakeFirst();

    if (!result) {
        throw new Error(`No auth key found for user_id: ${userId}`);
    }
    return result.user_id;
}

export async function updateAuthKeyById(id: number, authKey: Partial<AuthKeyUpdate>): Promise<number> {
    const result = await db.updateTable('auth_key')
        .set(authKey)
        .where('id', '=', id)
        .returning(['id'])
        .executeTakeFirst();
    if (!result) {
        throw new Error(`No auth key found with id: ${id}`);
    }
    return result.id;
}

export async function deleteAuthKeyByUserId(userId: number): Promise<number> {
    const result = await db.deleteFrom('auth_key')
        .where('user_id', '=', userId)
        .returning(['user_id'])
        .executeTakeFirst();

    if (!result) {
        throw new Error(`No auth key found for user_id: ${userId}`);
    }

    return result.user_id;
}