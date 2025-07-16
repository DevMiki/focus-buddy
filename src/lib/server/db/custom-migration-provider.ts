// src/lib/server/db/custom-migration-provider.ts
import type { Migration, MigrationProvider } from 'kysely';
import { promises as fs } from 'fs';
import path from 'path';
import url from 'url';

/**
 * A custom MigrationProvider that correctly handles ESM imports on all platforms,
 * especially Windows. It solves the `ERR_UNSUPPORTED_ESM_URL_SCHEME` and
 * `ERR_MODULE_NOT_FOUND` errors by providing a valid `file://` URL to the
 * dynamic `import()` function.
 */
export class ESMFileMigrationProvider implements MigrationProvider {
    constructor(private relativePath: string) { }

    async getMigrations(): Promise<Record<string, Migration>> {
        const migrations: Record<string, Migration> = {};
        
        // Get the absolute path to THIS file's directory.
        const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
        
        // Resolve the absolute path to the migrations folder.
        const resolvedMigrationsPath = path.resolve(__dirname, this.relativePath);

        const files = await fs.readdir(resolvedMigrationsPath);

        for (const fileName of files) {
            // We're using `tsx`, so we should look for the source TypeScript files.
            if (!fileName.endsWith(".ts") || fileName.endsWith('.d.ts')) {
                continue;
            }

            // 1. Construct the full, absolute file system path to the migration file.
            // e.g., 'D:\projects\app\src\lib\server\db\migrations\001_create_session_tables.ts'
            const absoluteMigrationPath = path.join(resolvedMigrationsPath, fileName);

            // 2. THE CRUCIAL FIX: Convert this absolute path into a valid `file://` URL.
            // e.g., 'file:///D:/projects/app/src/lib/server/db/migrations/001_create_session_tables.ts'
            const migrationUrl = url.pathToFileURL(absoluteMigrationPath);
            // 3. Import the module using the URL's `.href` property.
            // This is the unambiguous, cross-platform way to import a local file in ESM.
            const migration = await import(migrationUrl.href);

            const migrationKey = fileName.substring(0, fileName.lastIndexOf("."));

            migrations[migrationKey] = migration;
        }
        return migrations;
    }
}