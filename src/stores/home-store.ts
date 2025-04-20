import { defineStore } from 'pinia';
import { getTokenClaims } from "@/utils/jwtUtil";
import { ref } from 'vue';
import type { DropdownProps } from 'tdesign-vue-next';
// 定义用户数据类型
interface Claims {
  emp:{
    eAvatarpath: string;
    id: number;
    eName: string;
    eUsername: string;
  }
}
// 该模块用于管理home页用户数据
export const useHomeStore = defineStore('home', () => {
  /*
   *状态
   */
  // home页暂存的用户数据
  const id = ref<number | null>(null);
  const name = ref<string | null>(null);
  const username = ref<string | null>(null);
  const avatar = ref<string | null>(null);
  const myInfoVisible = ref(false)
  // 下拉菜单
  const options: DropdownProps['options'] = [
    {
      content: '个人中心',
      value: 1,
    },
    {
      content: '退出登录',
      value: 2,
      theme: 'error',
    },
  ];

  // 从token获取用户信息
  const getMyInfo = (): Claims | null => {
    const claims = getTokenClaims();
    if (claims != null) {
      id.value = claims.emp.id;
      name.value = claims.emp.eName;
      username.value = claims.emp.eUsername;
      avatar.value = claims.emp.eAvatarpath;
    }
    return null;
  }

  return {
    id,
    name,
    username,
    avatar,
    getMyInfo,
    options,
    myInfoVisible,
  };
});
