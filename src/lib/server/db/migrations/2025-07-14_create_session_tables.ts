import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {

    await db.schema
    .createTable('study_sessions')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
    .addColumn('planned_duration', 'integer', col => col.notNull().defaultTo(0))
    .addColumn('start_time', 'bigint', col => col.notNull())
    .addColumn('end_time', 'bigint', col => col.notNull())
    .addColumn('total_study_time', 'bigint', col => col.notNull().defaultTo(0))
    .addColumn('total_pause_time', 'bigint', col => col.notNull().defaultTo(0))
    .addColumn('total_pauses', 'integer', col => col.notNull().defaultTo(0))
    .addColumn('focus_score', 'bigint', col => col.notNull().defaultTo(0))
    .addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo(sql`now()::timestamptz`))
    .execute();

    await db.schema
    .createTable('session_segments')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.generatedAlwaysAsIdentity().primaryKey())
    .addColumn('session_id', 'integer', col => col.notNull().references('study_sessions.id').onDelete('cascade').notNull())
    .addColumn('type', 'text', col => col.notNull())
    .addCheckConstraint('segment_type_check', sql`type in ('study', 'pause', 'end')`)
    .addColumn('start_time', 'bigint', col => col.notNull())
    .addColumn('end_time', 'bigint', col => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('session_segments').ifExists().execute();
    await db.schema.dropTable('study_sessions').ifExists().execute();
}
