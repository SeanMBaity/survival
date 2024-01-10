import { STAGE } from "../../environment/environmentVariables";

/*
 * The tracing rate to use for production environments
 * As this is expensive, we usually this to a small percentage of requests.
 */
export const SENTRY_PRODUCTION_SAMPLE_RATE = 0.01;

/**
 * The tracing rate for both local development and staging environments.
 */
export const SENTRY_DEVELOPMENT_SAMPLE_RATE = 1;

/**
 * This controls how what proportion of requests are traced
 * before being sent to Sentry, which collects metadata around
 * request performance, hot-paths, etc.
 *
 * @example
 * 0.01 =   1% of requests
 * 0.1  =  10% of requests
 * 0.5  =  50% of requests
 * 1.0  = 100% of requests
 */
export const tracingSampleRate =
  STAGE === "prod"
    ? SENTRY_PRODUCTION_SAMPLE_RATE
    : SENTRY_DEVELOPMENT_SAMPLE_RATE;
