<template>
  <div class="g-mt">
    <label for="address">
      <span>查询下面用户的所有mirror文章</span>
      <textarea
        id="address"
        v-model="addressListStr"
        class="g-mt-l address-input"
        type="text"
      />
    </label>
    <BaseButton class="g-mt-l" :disabled="isLoading" @click="getHandler">
      Get
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import getUsersEntries from "@/views/HomePage/getUsersEntries";
import BaseButton from "@/components/BaseButton.vue";

const addressListStr = ref(
  "0xee787A96e318d0ab2797375D138981a6E49292Ae,0x70562F91075eea0f87728733b4bbe00F7e779788"
);
const isLoading = ref(false);

const getHandler = async () => {
  const addressList = addressListStr.value.split(",");
  await getUsersEntries(addressList);
};
</script>

<style lang="scss" scoped>
.address-input {
  display: block;
  width: 100%;
  max-width: 500px;
}
</style>
