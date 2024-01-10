import { EngineHandlerOptions } from "@volley/gev-engine-handler";

import { STAGE } from "../../environment/environmentVariables";
import { tracingSampleRate } from "./tracingSampleRate";

/**
 * The Data Source Name (DSN) associated with your Sentry project.
 */
export const GEV_SENTRY_KEY = "";

/**
 * The default configuration for Sentry across the project.
 */
const defaultSentryConfig: EngineHandlerOptions["sentry"] = {
  environment: STAGE as never,
  dsn: GEV_SENTRY_KEY,
  tracingSampleRate,
};

/**
 * Sentry is used to report and track errors.
 *
 * See the Sentry Support section in the GSK readme for more information
 */
export const sentryConfig = GEV_SENTRY_KEY ? defaultSentryConfig : undefined;
