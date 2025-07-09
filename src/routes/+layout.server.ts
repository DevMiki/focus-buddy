import { findAllThemes } from "$lib/server/repositories/theme-repository";
import type { LayoutServerLoad } from "./$types";

/**
 * Server-side load function for the layout route.
 * Retrieves all available themes to be used across the application.
 * 
 * @returns An object containing the list of themes
 */
export const load: LayoutServerLoad = async () => {
    console.log('Layout server load function running...');

    const themes = await findAllThemes();

    console.log('Layout server load function finished!');
    return {
        themes: themes
    }
}