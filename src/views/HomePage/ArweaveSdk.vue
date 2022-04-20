<template>
  <div class="g-mt">
    <div>arweave sdk包含查询和解码内容方法</div>
    <BaseButton @click="testSdk">test sdk</BaseButton>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import Arweave from "arweave";
// Content-Type : application/json
// App-Name : MirrorXYZ
// Contributor : 0xee787A96e318d0ab2797375D138981a6E49292Ae
// Content-Digest : ZMaUB0SfowkA5xdSufoDmpKi_oH3NONjVXh4zN3K14Q
// Original-Content-Digest : w7nuQ21dLhErKN7bBQqOFKhSIaNn52OJfiEGQlBfU7Q

const testSdk = async () => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  // get and decode data
  const transaction = await arweave.transactions.getData(
    "fWUi-wUiAcEsM3fpvAb7Re7DjDPnIk6RVu6BsaX3sT8",
    { decode: true, string: true }
  );
  console.log(transaction);
  // decode tags
  // transaction.get("tags").forEach((tag) => {
  //   const key = tag.get("name", { decode: true, string: true });
  //   const value = tag.get("value", { decode: true, string: true });
  //   console.log(`${key} : ${value}`);
  // });
  // search all
  // const result = await arweave.transactions.search("App-Name", "MirrorXYZ");
  // console.log(result);
};
</script>

<style lang="scss" scoped></style>
