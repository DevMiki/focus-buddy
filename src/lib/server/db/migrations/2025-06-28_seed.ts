import type { Kysely } from "kysely";
import { db } from "../db";


const backgroundOptions = [
    { name: 'Vivid Mountains', image_url: 'mountain.jpg', primary_color: '#7df9ff', secondary_color: '#f43f5e' },
    { name: 'Calm Mountains', image_url: 'dark_mountain.jpg', primary_color: '#549fca', secondary_color: '#502dd3' },
    { name: 'Green Landscape', image_url: 'green_landscape.png', primary_color: '#7df9ff', secondary_color: '#f43f5e' },
    { name: 'Mountain and Sea', image_url: 'mountain_and_sea.jpg', primary_color: '#7df9ff', secondary_color: '#f43f5e' }
];

export async function up(db: Kysely<any>): Promise<void> {
    console.log('Seeding database...');

    await db.schema.createTable('themes').ifNotExists()
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('image_url', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('primary_color', 'varchar(255)', (col) => col.notNull())
        .addColumn('secondary_color', 'varchar(255)', (col) => col.notNull())
        .execute();
        
    await db.insertInto('themes')
        .values(backgroundOptions)
        .onConflict((oc) => oc.column('name').doNothing())
        .execute();
}



export async function down(db: Kysely<any>): Promise<void> {
    console.log('Rolling back seed...');
    await db.schema.dropTable('themes').ifExists().execute();
}