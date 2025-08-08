import { findAllThemes } from "$lib/server/repositories/theme-repository";
import type { LayoutServerLoad } from "./$types";

/**
 * Server-side load function for the layout route.
 * Retrieves all available themes to be used across the application.
 * 
 * @returns An object containing the list of themes
 */
export const load: LayoutServerLoad = async (event) => {
	const themes = await findAllThemes();

	return {
		themes,
		user: event.locals.user
	};
};