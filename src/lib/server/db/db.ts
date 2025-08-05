import { Kysely } from "kysely";
import type { Database } from "$lib/types/database";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";

const studyTrackerPool = new Pool({
            database: 'study_tracker_db',
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            port: 5433,
            max: 10
        });

export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: studyTrackerPool
    })
})

const adapter = new NodePostgresAdapter(studyTrackerPool, {
    user: "auth_user",
    session: "auth_session"
});