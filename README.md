# vp-dynamic-nav

A VitePress plugin that fetches and renders the entire navbar dynamically from a remote JSON file. Older deployed versions of your docs always show the current nav without a rebuild.

## How it works

- On page load, nav is populated from `dynamicNavInitial` (config) or an empty state
- Cached nav from a previous visit is applied immediately from `localStorage`
- A fresh fetch from `dynamicNavUrl` runs in the background; on success the nav and cache are updated
- On fetch failure the cached (or initial) data is kept — no empty nav

## Install

```sh
npm install vp-dynamic-nav
```

## Usage

**`docs/.vitepress/theme/index.js`**

```js
import DefaultTheme from "vitepress/theme";
import { createDynamicNav } from "vp-dynamic-nav";

export default createDynamicNav(DefaultTheme);
```

**`docs/.vitepress/config.mjs`** — add to `themeConfig`:

```js
themeConfig: {
  // URL to fetch navbar.json from (GitHub raw content recommended)
  dynamicNavUrl:
    "https://raw.githubusercontent.com/<org>/<repo>/main/docs/.vitepress/navbar.json",

  // Optional: shown immediately before cache/fetch resolves (prevents empty flash on first visit)
  dynamicNavInitial: [
    {
      text: "Version",
      items: [
        { text: "main",        link: "https://docs.example.com/main/en/" },
        { text: "v1.0 (stable)", link: "https://docs.example.com/v1.0/en/" },
      ],
    },
  ],

  // Optional: override the localStorage cache key (defaults to dynamicNavUrl)
  // dynamicNavCacheKey: "my-docs-navbar",
}
```

**`docs/.vitepress/navbar.json`** — the remote source of truth (committed to `main`):

```json
{
  "nav": [
    {
      "text": "Version",
      "items": [
        { "text": "main",          "link": "https://docs.example.com/main/en/" },
        { "text": "v1.0 (stable)", "link": "https://docs.example.com/v1.0/en/" }
      ]
    }
  ]
}
```

## Advanced: manual wiring

If your theme already has a custom `Layout`, import the component directly instead of using `createDynamicNav`:

```js
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { DynamicNav } from "vp-dynamic-nav";

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "nav-bar-content-before": () => h(DynamicNav),
      "nav-screen-content-after": () => h(DynamicNav, { screen: true }),
    }),
};
```

## CSS

`createDynamicNav` injects a small `<style>` block into `document.head` at app startup. It sets CSS `order` values on VitePress's `.content-body` flex children to position the nav after the search bar and before the language/appearance/social controls, and adds a divider line between the nav and the language selector.

You can override any of these rules in your own stylesheet with a selector of equal or greater specificity, e.g.:

```css
/* docs/.vitepress/theme/style.css */
.VPNavBar .content-body .VPDynamicNav.bar { order: 10; }
```

## Compatibility

Requires VitePress `^1.0.0`. The plugin uses VitePress internal components (`VPNavBarMenuGroup`, etc.) via the `vitepress/dist/*` export wildcard — stable across VitePress 1.x.

## License

MIT
