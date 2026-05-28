import { h } from "vue";
import { inBrowser } from "vitepress";
import DynamicNav from "./DynamicNav.vue";

// Flex-order rules that place the dynamic nav after the search bar and before
// the language/appearance/social controls. Injected via enhanceApp so the
// package is self-contained — no separate CSS import required.
const CSS = [
  ".VPDynamicNav.bar{display:flex;align-items:center}",
  ".VPNavBar .content-body .VPDynamicNav.bar{order:2}",
  ".VPNavBar .content-body .translations{order:3}",
  ".VPNavBar .content-body .appearance{order:4}",
  ".VPNavBar .content-body .social-links{order:5}",
  ".VPNavBar .content-body .extra{order:6}",
  ".VPNavBar .content-body .VPDynamicNav.bar~.translations::before{" +
    "margin-right:8px;margin-left:8px;width:1px;height:24px;" +
    "background-color:var(--vp-c-divider);content:''}" ,
].join("\n");

export { default as DynamicNav } from "./DynamicNav.vue";

/**
 * Wraps a VitePress theme and injects DynamicNav into the nav bar slots.
 *
 * @param {object} baseTheme - A VitePress theme (e.g. DefaultTheme from 'vitepress/theme')
 * @returns {object} Extended theme with DynamicNav wired up
 *
 * themeConfig keys read by DynamicNav:
 *   dynamicNavUrl      {string}  GitHub raw URL to fetch navbar.json from
 *   dynamicNavInitial  {Array}   Initial nav items (prevents empty flash on first visit)
 *   dynamicNavCacheKey {string}  localStorage key (defaults to dynamicNavUrl)
 */
export function createDynamicNav(baseTheme) {
  return {
    extends: baseTheme,
    Layout: () =>
      h(baseTheme.Layout, null, {
        "nav-bar-content-before": () => h(DynamicNav),
        "nav-screen-content-after": () => h(DynamicNav, { screen: true }),
      }),
    enhanceApp() {
      if (inBrowser && !document.getElementById("vp-dynamic-nav-css")) {
        const el = document.createElement("style");
        el.id = "vp-dynamic-nav-css";
        el.textContent = CSS;
        document.head.appendChild(el);
      }
    },
  };
}
