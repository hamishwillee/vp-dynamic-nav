/**
 * Vite plugin that marks vp-dynamic-nav as non-external for SSR.
 *
 * VitePress loads config.mjs with Node.js's native ESM loader before Vite
 * starts, so any import in config.mjs is resolved by Node — which cannot
 * handle .vue files. This file has no .vue imports and is safe to import
 * from config.mjs. It hooks into Vite's config phase to add vp-dynamic-nav
 * to ssr.noExternal, so Vite (not Node) processes the package during the
 * SSR build.
 *
 * Usage in config.mjs:
 *   import { vpDynamicNavPlugin } from "vp-dynamic-nav/plugin";
 *   // inside defineConfig:
 *   vite: { plugins: [vpDynamicNavPlugin()] }
 */
export function vpDynamicNavPlugin() {
  return {
    name: "vp-dynamic-nav-ssr",
    config() {
      return { ssr: { noExternal: ["vp-dynamic-nav"] } };
    },
  };
}
