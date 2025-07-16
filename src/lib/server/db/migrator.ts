// src/lib/server/db/migrator.ts
import { Kysely, Migrator } from 'kysely';
import { db } from '../db';
// Import our new custom provider instead of the default one
import { ESMFileMigrationProvider } from './custom-migration-provider';

// Instantiate our custom provider.
// We pass it the relative path from THIS file to the 'migrations' folder.
const provider = new ESMFileMigrationProvider('./migrations');

// Create the Migrator instance with our custom provider.
export const migrator = new Migrator({
    db,
    provider,
});