const publicRoutes = ['/login', '/signup'];

export function isProtectedRoute(routeId: string | null): boolean {
	if (!routeId) {
		return true;
	}
	return !publicRoutes.some((publicRoute) => routeId.startsWith(publicRoute));
}