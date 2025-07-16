import { db } from "../db";
import { migrator } from "./migrator";

async function runMigrations() {
    console.log('Running migrations...');

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`✅ Migration "${it.migrationName}" was executed successfully.`);
        } else if (it.status === 'Error') {
            console.error(`❌ Failed to execute migration "${it.migrationName}".`);
        }
    });

    if (error) {
        console.error('Failed to migrate.');
        console.error(error);
        process.exit(1);
    }

    await db.destroy();
    console.log('Migrations complete.');
}

runMigrations();