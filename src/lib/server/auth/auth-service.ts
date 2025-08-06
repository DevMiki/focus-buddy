import { Scrypt } from "oslo/password";
import type { AuthUser, NewAuthSession } from "../../types/database";
import { createAuthSession, deleteAuthSession, deleteSessionIfExpired, findAuthSessionById } from "../repositories/auth-session-repository";
import { findAuthUserById } from "../repositories/auth-user-repository";
import { constantTimeEqual, generateSecureRandomString, hashSecret } from "./sessionHelpers";

const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 3;

async function createSession(userId: number): Promise<string> {
    const sessionId = generateSecureRandomString();
    const createdAt = new Date();
    const expiresAt = new Date(Date.now() + (SESSION_EXPIRES_IN_SECONDS * 1000));
    const secret = generateSecureRandomString();
    const hashedSecret = await hashSecret(secret);
    const sessionToken = `${sessionId}.${secret}`;

    const sessionToCreate: NewAuthSession = {
        id: sessionId,
        created_at: createdAt,
        expires_at: expiresAt,
        secret_hash: hashedSecret,
        user_id: userId
    };

    const newSession = await createAuthSession(sessionToCreate);

    if (newSession) {
        return sessionToken;
    }
    throw Error("Could not create session");
}

export async function validateSessionToken(token: string): Promise<AuthUser | null> {

    const [id, secret] = token.split('.');
    if (!id || secret) throw Error("Invalid session token")

    const session = await findAuthSessionById(id);

    if (!session) return null;

    await deleteSessionIfExpired(session);

    const isValidSecret = await checkIfValidSecret(secret, session.secret_hash);

    if (isValidSecret) {
        const user: AuthUser | undefined = await findAuthUserById(session.user_id);
        return user ?? null;
    }

    return null;
}

async function checkIfValidSecret(tokenSecret: string, sessionHashedSecret: Uint8Array): Promise<boolean> {
    const tokenHashedSecret = await hashSecret(tokenSecret);
    return constantTimeEqual(tokenHashedSecret, sessionHashedSecret)
}

export async function deleteSession(token: string): Promise<void> {
    const [id] = token.split('.');
    if (!id) throw Error("Invalid session token")
    await deleteAuthSession(id);
}

export async function hashPassword(password: string): Promise<string> {
    return new Scrypt().hash(password);
}

export async function verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return new Scrypt().verify(hashedPassword, plainPassword);
}

