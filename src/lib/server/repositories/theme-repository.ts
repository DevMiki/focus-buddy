import type { NewTheme, Theme, ThemeUpdate } from "$lib/types/database"
import { db } from "../db/db"

export async function findThemeById(id: number) {
    return await db.selectFrom('themes')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findAllThemes(): Promise<Theme[]> {
    return await db.selectFrom('themes')
    .selectAll()
    .orderBy('name', 'asc')
    .execute()
}

export async function createTheme(theme: NewTheme){
    return await db.insertInto('themes')
    .values(theme)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function updateTheme(id: number, updateWith: ThemeUpdate){
    return await db.updateTable('themes')
    .set(updateWith)
    .where('id', '=', id)
    .returningAll()
    .execute()
}

export async function deleteTheme(id: number){
    return await db.deleteFrom('themes')
    .where('id', '=', id)
    .executeTakeFirst()
}