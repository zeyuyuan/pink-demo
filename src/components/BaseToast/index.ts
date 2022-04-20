import { createApp } from "vue";
import i18n from "@/i18n";
import BaseToast from "./BaseToast.vue";

interface ToastOptions {
  message: string;
  duration?: number;
  type?: "success" | "error";
  onClose?: () => void;
}

interface ToastType {
  (options: ToastOptions | string): void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const Toast: ToastType = (options) => {
  const props: ToastOptions =
    typeof options === "string"
      ? {
          message: options,
        }
      : options;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const toastIns = createApp(BaseToast, {
    message: props.message,
    duration: props.duration,
    type: props.type,
    onClose: () => {
      toastIns.unmount();
    },
  }).use(i18n);
  const parent = document.getElementById("toast-list");
  if (!parent) {
    const newParent = document.createElement("div");
    newParent.setAttribute("id", "toast-list");
    document.body.appendChild(newParent);
  }
  const container = document.createElement("div");
  toastIns.mount(container);
  window.setTimeout(() => {
    toastIns.unmount();
  }, props.duration || 3000);
};

Toast.success = (message: string) => {
  Toast({
    message,
    type: "success",
  });
};

Toast.error = (message: string) => {
  Toast({
    message,
    type: "error",
  });
};

export default Toast;
