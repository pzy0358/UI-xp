<template>
  <div>
    <m-menu
      active-text-color="#ff6600"
      background-color="red"
      mode="horizontal"
      :data="data"
      defaultActive="2"
      router
    ></m-menu>
  </div>
</template>
<script lang="ts" setup>
const data = [
  {
    name: "导航1",
    index: "1",
    icon: "document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "document",
      },
      {
        name: "导航3-2",
        index: "3-2",
        icon: "document",
      },
    ],
  },
];
</script>

<style></style>
