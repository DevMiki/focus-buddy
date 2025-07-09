import { db } from "./db";


const backgroundOptions = [
    { name: 'Vivid Mountains', value: 'mountain.jpg' },
    { name: 'Calm Mountains', value: 'dark_mountain.jpg' },
    { name: 'Green Landscape', value: 'green_landscape.png' },
    { name: 'Mountain and Sea', value: 'mountain_and_sea.jpg' }
];

async function seed() {
    console.log('Seeding database...');

    await db.transaction().execute(async (trx) => {
        await trx.schema.dropTable('themes').ifExists().execute();

        await trx.schema.createTable('themes').ifNotExists()
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('value', 'varchar(255)', (col) => col.notNull().unique())
        .execute();

        await trx.insertInto('themes').values(backgroundOptions).execute();
    })

    console.log('Seeding complete!');
}

seed().catch((error) =>{
    console.log('Error seeding database:', error);
    process.exit(1);
})