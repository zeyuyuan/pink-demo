<template>
  <div class="container">
    <BaseButton @click="getFromMirror">从mirror-api查询单个地址文章</BaseButton>
    <div>
      https://mirror-api.com/graphql
      mirror的接口可用，结果是文章列表，包含草稿，包含文章body和大图;
      但只能查询单个地址，不确定是否有频率限制, 找不到其他接口文档
    </div>
    <BaseButton @click="getFromArweave">getFromArweave</BaseButton>
    <div>go mirror 有接口关注 和 查询关注地址的最新更新</div>
    <BaseButton @click="getGoMirror">go mirror</BaseButton>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import BaseButton from "@/components/BaseButton.vue";
import { query } from "gql-query-builder";

const getFromMirror = async () => {
  const result = await axios({
    method: "POST",
    url: "https://mirror-api.com/graphql",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: JSON.parse(
      `{"operationName":"Entries","variables":{"projectAddress":"0xee787A96e318d0ab2797375D138981a6E49292Ae"},"query":"query Entries($projectAddress: String!) {\\n  entries(projectAddress: $projectAddress) {\\n    ...entryDetails\\n    collaborators {\\n      ...memberDetails\\n      __typename\\n    }\\n    editions {\\n      ...entryEdition\\n      blockState {\\n        status\\n        __typename\\n      }\\n      __typename\\n    }\\n    publisher {\\n      ...publisherDetails\\n      __typename\\n    }\\n    settings {\\n      ...entrySettingsDetails\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment entryDetails on entry {\\n  _id\\n  body\\n  hideTitleInEntry\\n  publishStatus\\n  publishedAtTimestamp\\n  originalDigest\\n  timestamp\\n  title\\n  arweaveTransactionRequest {\\n    transactionId\\n    __typename\\n  }\\n  featuredImageId\\n  featuredImage {\\n    mimetype\\n    sizes {\\n      og {\\n        ...mediaAssetSize\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  publisher {\\n    ...publisherDetails\\n    __typename\\n  }\\n  latestBlockData {\\n    timestamp\\n    number\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment mediaAssetSize on MediaAssetSizeType {\\n  src\\n  height\\n  width\\n  __typename\\n}\\n\\nfragment publisherDetails on PublisherType {\\n  project {\\n    ...projectDetails\\n    __typename\\n  }\\n  member {\\n    ...projectDetails\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment projectDetails on ProjectType {\\n  _id\\n  address\\n  avatarURL\\n  description\\n  displayName\\n  domain\\n  ens\\n  gaTrackingID\\n  mailingListURL\\n  headerImage {\\n    ...mediaAsset\\n    __typename\\n  }\\n  theme {\\n    ...themeDetails\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment mediaAsset on MediaAssetType {\\n  id\\n  cid\\n  mimetype\\n  sizes {\\n    ...mediaAssetSizes\\n    __typename\\n  }\\n  url\\n  __typename\\n}\\n\\nfragment mediaAssetSizes on MediaAssetSizesType {\\n  og {\\n    ...mediaAssetSize\\n    __typename\\n  }\\n  lg {\\n    ...mediaAssetSize\\n    __typename\\n  }\\n  md {\\n    ...mediaAssetSize\\n    __typename\\n  }\\n  sm {\\n    ...mediaAssetSize\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment themeDetails on UserProfileThemeType {\\n  accent\\n  colorMode\\n  __typename\\n}\\n\\nfragment memberDetails on ProjectType {\\n  _id\\n  address\\n  avatarURL\\n  displayName\\n  __typename\\n}\\n\\nfragment entryEdition on edition {\\n  _id\\n  title\\n  price\\n  quantity\\n  description\\n  editionId\\n  mediaURL\\n  editionContractAddress\\n  fundingRecipient\\n  events {\\n    event\\n    transactionHash\\n    numSold\\n    avatarURL\\n    twitterUsername\\n    serialNumber\\n    collectorAddress\\n    amountPaid\\n    blockNumber\\n    __typename\\n  }\\n  attributes {\\n    trait_type\\n    value\\n    __typename\\n  }\\n  primaryMedia {\\n    mimetype\\n    sizes {\\n      og {\\n        ...mediaAssetSize\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  thumbnailMedia {\\n    mimetype\\n    sizes {\\n      og {\\n        ...mediaAssetSize\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment entrySettingsDetails on EntrySettingsType {\\n  description\\n  metaImage {\\n    ...mediaAsset\\n    __typename\\n  }\\n  title\\n  __typename\\n}\\n"}`
    ),
  });
  console.log(result);
};

const getFromArweave = async () => {
  const data = query({
    operation: "transactions",
    variables: {
      tags: {
        value: [
          {
            name: "App-Name",
            values: ["MirrorXYZ"],
          },
          {
            name: "Original-Content-Digest",
            values: ["GjssNdA6XK7VYynkvwDem3KYwPACSU9nDWpR5rei3hw"],
          },
        ],
        type: "TagFilter!",
        list: true,
      },
      // owners: {
      //   value: ["0xee787A96e318d0ab2797375D138981a6E49292Ae"],
      //   type: "String!",
      //   list: true,
      // },
    },
    fields: [
      {
        edges: [
          {
            node: ["id", { data: ["size", "type"] }],
          },
        ],
      },
    ],
  });
  const result = await axios({
    method: "POST",
    url: "https://arweave.net/graphql",
    data,
  });
  console.log(result);
};

const getGoMirror = async () => {
  const result = await axios({
    method: "get",
    url: "https://gomirror.xyz/backend/recently_updated/0xee787A96e318d0ab2797375D138981a6E49292Ae?pageNo=1&pageSize=20",
  });
  console.log(result);
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40px;
}
</style>
