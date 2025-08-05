import type { Database } from "$lib/types/database";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

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