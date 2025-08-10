import { db } from "./db";
import { migrator } from "./migrator";

async function migrateToLatest() {
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
    console.log('✅ Migrations complete.');
}

async function rollbackAllMigrations() {

    console.log('Rollbacking all migrations...');

    const { error, results } = await migrator.migrateTo('0');

    results?.forEach(result => {
        if (result.status === 'Success') {
            console.log(`✅ Rolled back migration "${result.migrationName}".`);
        } else if (result.status === 'Error') {
            console.error(`❌ Failed to roll back migration "${result.migrationName}".`);
        }

        if (error) {
            console.error('Failed to rollback migrations.');
            console.error(error);
            process.exit(1);
        }
    })
    await db.destroy();
    console.log('✅ Migration rolled back.');
}

async function run() {
    // `process.argv` is a Node.js array containing command-line arguments.
    // The first two are 'node' and the script path. The third is our command.
    const command = process.argv[2];

    switch (command) {
        case '--latest':
            return migrateToLatest();
        case '--rollback':
            return rollbackAllMigrations();
        case '--reset':
            return Promise.all([rollbackAllMigrations(), migrateToLatest()]);
        default:
            throw new Error(`Unknown command: ${command}`);
    }
}

run();