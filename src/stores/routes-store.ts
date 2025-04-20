import { defineStore } from "pinia";
import { ref, toRaw, reactive } from "vue";
import { getRoutes, addRoute, updateRoute, deleteRoute, getRoutePage, searchRoute } from '@/api/services/route-api';
import type { RouteEntity, Route } from "@/models/route";
import router from '@/router';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormProps } from 'tdesign-vue-next';

export const useRouteStore = defineStore('routes', () => {

  // 所有路由
  const allRoutes = ref<RouteEntity[]>([]);
  // 动态路由
  const dynamicRoutes = ref<Route[]>([]);
  // 页面访问目标路由
  const aimRoutePath = ref('no aim path');
  // 路由表路由数据
  const routesTableData = ref<RouteEntity[]>([]);
  // 路由表当前页
  const currentPage = ref(1);
  // 路由表数据数
  const total = ref(0);
  // 路由表大小
  const pageSize = ref(10);
  // 选中的行
  const selectedIds = ref<number[]>([]);
  // 路由编辑表单
  const routeEditFormData: FormProps['data'] = reactive({
    name: '',
    value: '',
    type: 'LINK',
    state: 1,
    sort: 0,
    discription: '',
    icon: '',
    parentrouteid: 0,
    redirect: '',
    alias: '',
  });
  // 路由编辑规则
  const ROUTE_EDIT_FORM_RULES = {
    alias: [
      { required: true, message: '请输入正确的路由名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    value: [
      { required: true, message: '请输入正确的路由值', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ]
  }
  // 类型选项
  const ROUTE_TYPE_OPTIONS = ref([
    { label: '菜单', value: 'MENU' },
    { label: '页面', value: 'LINK' },
  ]);
  // 状态选项
  const ROUTE_STATE_OPTIONS = ref([
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 },
  ]);
  // 路由添加表单
  const routeAddFormData: FormProps['data'] = reactive({
    name: '',
    value: '',
    type: 'LINK',
    state: 1,
    sort: 0,
    discription: '',
    icon: '',
    parentrouteid: 0,
    redirect: '',
    alias: '',
  });
  // 路由添加规则
  const ROUTE_ADD_FORM_RULES = {
    alias: [
      { required: true, message: '请输入路由名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    value: [
      { required: true, message: '请输入路由值', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ]
  }



  // 递归解析子路由并动态加载组件
  const routerChildren = (children: RouteEntity[]): Route[] => {
    const parsedRoutes = children.map(route => {
      return {
        path: route.value,
        name: route.alias,
        component: routerCom(route.name),
        redirect: route.redirect,
        meta: {
          id: route.id,
          icon: route.icon,
          state: route.state,
          sort: route.sort,
          type: route.type,
          description: route.discription,
          createUserId: route.createuserid
        },
        children: route.children ? routerChildren(route.children) : []
      } as Route;
    });
    return sortRoutes(parsedRoutes);
  };

  // 动态解析组件
  const routerCom = (name: string) => {
    if (!name) {
      return () => import('@/views/notFound.vue');
    }
    return () => import(`@/views/${name}.vue`);
  };

  // 路由排序函数，根据 meta.sort 排序
  const sortRoutes = (routes: Route[]): Route[] => {
    return routes.sort((a, b) => {
      const sortA = a.meta.sort || 0;
      const sortB = b.meta.sort || 0;
      return sortA - sortB;
    });
  };

  // 获取动态路由并添加到路由中
  const getDynamicRoutes = async () => {
    await getRoutes().then(res => {
      const parsedRoutes = res.data.result.map((route: RouteEntity) => ({
        path: route.value,
        name: route.alias,
        component: routerCom(route.name),
        redirect: route.redirect,
        meta: {
          id: route.id,
          icon: route.icon,
          state: route.state,
          sort: route.sort,
          type: route.type,
          description: route.discription,
          createUserId: route.createuserid,
          parentRouteId: route.parentrouteid
        },
        children: route.children ? routerChildren(route.children) : []
      } as Route));

      // 对顶级路由进行排序
      dynamicRoutes.value = sortRoutes(parsedRoutes);
      // 添加 404 路由到最后
      dynamicRoutes.value.push({
        path: '/:pathMatch(.*)*',
        name: '找不到页面',
        component: () => import('../views/notFound.vue'),
        redirect: '',
        meta: {
          id: 404,
          icon: '',
          state: 0,
          sort: 999,
          type: 'error',
          description: '找不到页面',
          createUserId: 404,
        },
        children: []
      });
      const routes = toRaw(dynamicRoutes.value);
      routes.forEach((route: Route) => {
        router.addRoute(route);
      });
    });
  };

  // 获取分页后的路由
  const getPage = async () => {
    await getRoutePage(currentPage.value, pageSize.value).then(res => {
      routesTableData.value = res.data.result.rows;
      total.value = res.data.result.total;
    });
  };

  // 搜索路由
  const searchRoutes = async (route: any) => {
    await searchRoute(route).then(res => {
      routesTableData.value = res.data.result;
      total.value = res.data.result.length;
    });
  };
  // 获取所有路由
  const getAllRoutes = async () => {
    await searchRoute({}).then(
      res => {
        allRoutes.value = res.data.result;
      }
    )
  };

  // 添加路由
  const addRoutes = async (route: any) => {
    await addRoute(route).then(res => {
      MessagePlugin.success('添加成功');
      getPage();
    })
  };
  // 修改路由
  const updateRoutes = async (route: any) => {
    await updateRoute(route).then(res => {
      MessagePlugin.success('修改成功');
      getPage();
    })
  };
  // 删除路由
  const deleteRoutes = async (ids: number[]) => {
    await deleteRoute(ids).then(res => {
      MessagePlugin.success('删除成功');
      getPage();
    })
  };
  // table选中回调
  const handleSelectionChange = (selection: RouteEntity[]) => {
    selectedIds.value = selection.map(item => item.id!);
  }





  return {
    dynamicRoutes,
    aimRoutePath,
    getDynamicRoutes,
    routerCom,
    routerChildren,
    getPage,
    routesTableData,
    total,
    pageSize,
    currentPage,
    searchRoutes,
    addRoutes,
    updateRoutes,
    deleteRoutes,
    handleSelectionChange,
    selectedIds,
    routeAddFormData,
    ROUTE_ADD_FORM_RULES,
    ROUTE_TYPE_OPTIONS,
    ROUTE_STATE_OPTIONS,
    ROUTE_EDIT_FORM_RULES,
    routeEditFormData,
    getAllRoutes,
    allRoutes
  };
});
