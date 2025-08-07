import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("auth_user")
        .ifNotExists()
        .addColumn("id", "integer", col => col.generatedAlwaysAsIdentity().primaryKey().notNull())
        .addColumn("username", "varchar(36)", col => col.notNull().unique())
        .execute();

    await db.schema
        .createTable("auth_session")
        .ifNotExists()
        .addColumn("id", "text", col => col.primaryKey().notNull())
        .addColumn("created_at", "timestamptz", col => col.notNull())
        .addColumn("expires_at", "timestamptz", col => col.notNull())
        .addColumn("secret_hash", "bytea", col => col.notNull())
        .addColumn("user_id", "integer", col => col.notNull())
        .addForeignKeyConstraint(
            "session_user_fk",
            ["user_id"],
            "auth_user",
            ["id"],
            fk => fk.onDelete("cascade")
        )
        .execute();

    await db.schema
        .createTable("auth_key")
        .ifNotExists()
        .addColumn("id", "integer", col => col.generatedAlwaysAsIdentity().primaryKey().notNull())
        .addColumn("hashed_password", "text")
        .addColumn("user_id", "integer", col => col.notNull())
        .addForeignKeyConstraint(
            "key_user_fk",
            ["user_id"],
            "auth_user",
            ["id"],
            fk => fk.onDelete("cascade")
        )
        .execute();
}


export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("auth_user").execute();
    await db.schema.dropTable("auth_session").execute();
    await db.schema.dropTable("auth_key").execute();
}