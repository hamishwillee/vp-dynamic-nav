# vp-dynamic-nav playground

Use this page to verify the dynamic nav renders correctly.

**What to check:**

1. The nav bar shows **Dronecode** and **Version** dropdowns immediately (from `dynamicNavInitial`)
2. After a moment the full navbar fetched from `dynamicNavUrl` appears (adds Support link, more versions)
3. DevTools → Application → Local Storage → key matching the `dynamicNavUrl` contains the cached JSON
4. Reload — cached nav appears instantly with no flash
5. On mobile (narrow viewport) the nav items appear in the hamburger menu
