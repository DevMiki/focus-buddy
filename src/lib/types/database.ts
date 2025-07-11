import type { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ThemesTable {
    id: Generated<number>;
    name: string;
    image_url: string;
    primary_color: string;
    secondary_color: string;
}

export interface Database {
    themes: ThemesTable;
}

export type Theme = Selectable<ThemesTable>
export type NewTheme = Insertable<ThemesTable>
export type ThemeUpdate = Updateable<ThemesTable>