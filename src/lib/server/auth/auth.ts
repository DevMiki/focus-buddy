import { constantTimeEqual, generateSecureRandomString, hashSecret } from "./sessionHelpers";
import type { AuthSession, AuthUser, NewAuthSession } from "../../types/database";
import { db } from "../db/db";
import { findAuthSessionById } from "../repositories/auth-session";

const SESSION_EXPIRES_IN_SECONDS = 60*60*24*3;

async function createSession(userId: number): Promise<string> {
    const sessionId = generateSecureRandomString();
    const createdAt = new Date();
    const expiresAt = new Date(Date.now() + (SESSION_EXPIRES_IN_SECONDS * 1000));
    const secret = generateSecureRandomString();
    const hashedSecret = await hashSecret(secret);
    const sessionToken = `${sessionId}.${secret}`;

    const newSession: NewAuthSession = {
        id: sessionId,
        created_at: createdAt,
        expires_at: expiresAt,
        secret_hash: hashedSecret,
        user_id: userId
    };

    await db.insertInto('auth_session')
        .values(newSession)
        .execute();

    return sessionToken;
}

export async function validateSessionToken(token: string): Promise<AuthUser | null> {
    
    const [id, secret] = token.split('.');
    if (!id || secret) throw Error("Invalid session token")
    
    const session = await findAuthSessionById(id);

    if(!session) return null;

    deleteSessionIfExpired(session, id);
    
    const tokenHashedSecret = await hashSecret(secret);
    const isValidSecret = constantTimeEqual(tokenHashedSecret, session.secret_hash)
    if(isValidSecret){
        const user : AuthUser | undefined = await db.selectFrom('auth_user')
        .where('id', '=', session.user_id)
        .selectAll()
        .executeTakeFirst();

        return user ?? null;
    }

    return null;
}

async function deleteSessionIfExpired(session: AuthSession, id: string): Promise<void> {
     if(new Date() > session.expires_at) {
        await db.deleteFrom('auth_session').where('id', '=', id).execute();
    }
}