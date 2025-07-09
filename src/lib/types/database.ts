import type { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ThemesTable {
    id: Generated<number>;
    name: string;
    value: string;
}

export interface Database {
    themes: ThemesTable;
}

export type Theme = Selectable<ThemesTable>
export type NewTheme = Insertable<ThemesTable>
export type ThemeUpdate = Updateable<ThemesTable>