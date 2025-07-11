import { db } from "./db";


const backgroundOptions = [
    { name: 'Vivid Mountains', image_url: 'mountain.jpg', primary_color: '#7df9ff', secondary_color: '#f43f5e' },
    { name: 'Calm Mountains', image_url: 'dark_mountain.jpg', primary_color: '#7df9ff', secondary_color: '#f43f5e' },
    { name: 'Green Landscape', image_url: 'green_landscape.png', primary_color: '#7df9ff', secondary_color: '#f43f5e' },
    { name: 'Mountain and Sea', image_url: 'mountain_and_sea.jpg', primary_color: '#7df9ff', secondary_color: '#f43f5e' }
];

async function seed() {
    console.log('Seeding database...');

    await db.transaction().execute(async (trx) => {
        await trx.schema.dropTable('themes').ifExists().execute();

        await trx.schema.createTable('themes').ifNotExists()
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('image_url', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('primary_color', 'varchar(255)', (col) => col.notNull())
        .addColumn('secondary_color', 'varchar(255)', (col) => col.notNull())
        .execute();

        await trx.insertInto('themes').values(backgroundOptions).execute();
    })

    console.log('Seeding complete!');
}

seed().catch((error) =>{
    console.log('Error seeding database:', error);
    process.exit(1);
})