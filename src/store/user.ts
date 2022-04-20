import { createGlobalState } from "@vueuse/core";

import { ref } from "vue";

export const useAccountState = createGlobalState(() =>
  ref<string>(window.ethereum?.selectedAddress || "")
);
