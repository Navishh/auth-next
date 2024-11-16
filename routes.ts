/**
 * An array of routes that are accessible to the public
 * Thses routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are usedd for authentication
 * Redirrect the users to the settings page after loged in
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * For API authentication routes
 * routes that start eith thidd prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * Default path after logging in
 * @type {string}
 */

export const DEFAULT_LOGGIN_REDIRRECT = "/settings";
