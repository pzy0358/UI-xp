<template>
  <div>
    <m-choose-Area @change="getData"></m-choose-Area>
  </div>
</template>
<script lang="ts" setup>
// import mChooseArea from "../../components/chooseArea/src/index.vue";
import { Data } from "../../components/chooseArea/src/type";

const getData = (areas: Data) => {
  console.log('areas',areas);
}

</script>
<style></style>
