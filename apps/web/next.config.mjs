/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@aix/ui"],
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
};

export default config;
