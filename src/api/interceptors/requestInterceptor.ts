import { useUserStore } from "@/stores/user-store";


// 请求拦截器
export const requestInterceptor = async (config: any) => {
  // 获取用户信息
  const userStore = useUserStore();
  const token = userStore.token;
  // 添加请求头
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};