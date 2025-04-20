import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 定义标签数据类型
interface Tag {
  name: string;
  path: string;
  meta: Record<string, any>;
  isActive: boolean;
}

// 该模块用于管理标签数据
export const useTagsStore = defineStore('tags', () => {
  // 标签列表
  const tagsList = ref<Tag[]>([]);
  const currentRoute = ref<Tag | null>(null);

  const router = useRouter();

  // 根据路由设置标签是否激活
  const setTagsList = (curTag: Tag) => {
    tagsList.value.forEach(tag => {
      tag.isActive = false;
      if (tag.name === curTag.name) {
        tag.isActive = true;
      }
    });
    currentRoute.value = curTag;
  };

  // 添加路由
  const addRoute = (curTag: Tag) => {
    const target = tagsList.value.find(item => item.name === curTag.name);
    // 如果没有找到，则添加
    if (!target) {
      tagsList.value.push({
        path: curTag.path,
        name: curTag.name,
        meta: curTag.meta,
        isActive: false
      });
    } else {
      // 找到了，则更新
      const targetIndex = tagsList.value.findIndex(item => item.name === curTag.name);
      tagsList.value[targetIndex] = {
        ...target,
        path: curTag.path,
        name: curTag.name,
        meta: curTag.meta,
        isActive: false
      };
    }

    setTagsList(curTag);
  };

  // 删除路由
  const delRoute = (curTag: Tag) => {
    const targetIndex = tagsList.value.findIndex(item => item.name === curTag.name);
    tagsList.value.splice(targetIndex, 1);
    // 如果删除的是最后一个，则跳转到倒数第二个
    if (tagsList.value.length > 0) {
      const last = tagsList.value[tagsList.value.length - 1];
      router.push({ path: last.path });
      setTagsList(last);
    } else {
      router.push('/');
    }
  };

  return {
    tagsList,
    currentRoute,
    setTagsList,
    addRoute,
    delRoute,
  };
});