/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_API_BASE_URL: string;
      // 可以添加其他环境变量
    }
  }
}
declare module '*'