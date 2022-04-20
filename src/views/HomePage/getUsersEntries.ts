import axios from "axios";
import { query } from "gql-query-builder";
import Arweave from "arweave";

interface EdgeItem {
  cursor: string;
  node: {
    id: string;
  };
}

interface Response {
  data: {
    transactions: {
      edges: EdgeItem[];
      pageInfo: {
        hasNextPage: boolean;
      };
    };
  };
}

const getUsersEntries = async (addressList: string[]) => {
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
            name: "Contributor",
            values: addressList,
          },
        ],
        type: "TagFilter!",
        list: true,
      },
      first: 999, // todo 处理翻页
    },
    fields: [
      {
        pageInfo: ["hasNextPage"],
      },
      {
        edges: [
          "cursor", // for next page after
          {
            node: ["id"],
          },
        ],
      },
    ],
  });
  const result = await axios.request<Response>({
    method: "POST",
    url: "https://arweave.net/graphql",
    data,
  });
  const { hasNextPage } = result.data.data.transactions.pageInfo;
  console.log("hasNextPage?", hasNextPage);
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const pms = result.data.data.transactions.edges.map((item) => {
    return arweave.transactions.getData(item.node.id, {
      decode: true,
      string: true,
    });
  });
  const pmsResult = await Promise.allSettled(pms);
  console.log("Promise result", pmsResult);
  console.log(
    "Promise result format",
    pmsResult.map((item) => {
      if (item.status === "fulfilled") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(item.value as string);
      }
      return null; // error
    })
  );
  // todo 根据originalDigest 去重取最新
};

export default getUsersEntries;
