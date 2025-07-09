import { Kysely } from "kysely";
import type { Database } from "$lib/types/database";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";


export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            database: 'study_tracker_db',
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            port: 5433,
            max: 10
        })
    })
})