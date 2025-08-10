import { sql, type Kysely } from "kysely";

const ORPHANED_SESSION_USER_ID = -1;
const ORPHANED_SESSION_USERNAME = 'system_orphanage';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .alterTable("study_sessions")
        .addColumn("user_id", "integer", col => col.references("auth_user.id").onDelete("cascade"))
        .execute();


    await sql`
            INSERT INTO auth_user (id, username)
            OVERRIDING SYSTEM VALUE
            VALUES (${ORPHANED_SESSION_USER_ID}), (${ORPHANED_SESSION_USERNAME})})
            ON CONFLICT (id) DO NOTHING`.execute(db);


    await db
        .updateTable('study_sessions')
        .set({ user_id: ORPHANED_SESSION_USER_ID })
        .where("user_id", "=", null)
        .execute();

    await db.schema
        .alterTable("study_sessions")
        .alterColumn("user_id", col => col.setNotNull())
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.alterTable("study_sessions").dropColumn("user_id").execute();
    await db.deleteFrom('auth_user').where('username', '=', ORPHANED_SESSION_USERNAME)
        .execute();
}