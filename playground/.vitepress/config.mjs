import { defineConfig } from "vitepress";

export default defineConfig({
  title: "vp-dynamic-nav playground",
  description: "Test playground for vp-dynamic-nav",
  themeConfig: {
    dynamicNavUrl:
      "https://raw.githubusercontent.com/PX4/PX4-Autopilot/main/docs/.vitepress/navbar.json",
    dynamicNavInitial: [
      {
        text: "Dronecode",
        items: [
          { text: "PX4", link: "https://px4.io/" },
          { text: "QGroundControl", link: "http://qgroundcontrol.com/" },
          { text: "MAVSDK", link: "https://mavsdk.mavlink.io/" },
        ],
      },
      {
        text: "Version",
        items: [
          { text: "main", link: "https://docs.px4.io/main/en/" },
          { text: "v1.17 (stable)", link: "https://docs.px4.io/v1.17/en/" },
          { text: "v1.16", link: "https://docs.px4.io/v1.16/en/" },
        ],
      },
    ],
  },
});
