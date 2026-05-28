<template>
  <!-- Desktop nav bar layout -->
  <div v-if="!screen" class="VPDynamicNav bar">
    <template v-for="(item, i) in nav" :key="i">
      <VPNavBarMenuLink v-if="!item.items" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </div>

  <!-- Mobile screen layout -->
  <div v-else class="VPDynamicNav screen">
    <template v-for="(item, i) in nav" :key="i">
      <VPNavScreenMenuLink v-if="!item.items" :item="item" />
      <VPNavScreenMenuGroup v-else :text="item.text" :items="item.items" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { inBrowser, useData } from "vitepress";
import VPNavBarMenuLink from "vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue";
import VPNavBarMenuGroup from "vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue";
import VPNavScreenMenuLink from "vitepress/dist/client/theme-default/components/VPNavScreenMenuLink.vue";
import VPNavScreenMenuGroup from "vitepress/dist/client/theme-default/components/VPNavScreenMenuGroup.vue";

defineProps({ screen: { type: Boolean, default: false } });

const { theme } = useData();
const nav = ref(theme.value.dynamicNavInitial || []);

onMounted(() => {
  if (!inBrowser) return;

  const remoteUrl = theme.value.dynamicNavUrl;
  const cacheKey = theme.value.dynamicNavCacheKey || remoteUrl || "vp-dynamic-nav";

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      if (Array.isArray(data.nav)) nav.value = data.nav;
    }
  } catch {}

  if (!remoteUrl) return;

  fetch(remoteUrl)
    .then((res) => {
      if (!res.ok) throw new Error("non-200");
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data.nav)) {
        nav.value = data.nav;
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }
    })
    .catch(() => {});
});
</script>

