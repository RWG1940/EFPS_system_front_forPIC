import { defineStore } from "pinia";
import { ref, toRaw, reactive } from "vue";
import { getPermissions, addPermission, updatePermission, deletePermission, getPermissionPage, searchPermission } from '@/api/services/permission-api';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormProps } from 'tdesign-vue-next';

export interface PermissionEntity {
    mId?: number;
    mName: string;
    mUrl: string;
    mSign: string;
}
export const usePermissionStore = defineStore('permissions', () => {

    // 所有权限
    const allPermissions = ref<PermissionEntity[]>([]);
    // 权限表路由数据
    const permissionsTableData = ref<PermissionEntity[]>([]);
    // 权限表当前页
    const currentPage = ref(1);
    // 权限表数据数
    const total = ref(0);
    // 权限表大小
    const pageSize = ref(10);
    // 选中的行
    const selectedIds = ref<number[]>([]);
    // 权限编辑表单
    const permissionEditFormData: FormProps['data'] = reactive({
        mId: '',
        mName: '',
        mUrl: '',
        mSign: '',
    });
    //权限编辑规则
    const PERMISSION_EDIT_FORM_RULES = {
        mName: [
            { required: true, message: '请输入正确的权限名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        mSign: [
            { required: true, message: '请输入正确的权限标志值', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
    }

    // 权限添加表单
    const permissionAddFormData: FormProps['data'] = reactive({
        mName: '',
        mUrl: '',
        mSign: '',
    });
    // 权限添加规则
    const PERMISSION_ADD_FORM_RULES = {
        mName: [
            { required: true, message: '请输入正确的权限名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        mSign: [
            { required: true, message: '请输入正确的权限标志值', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
    }

    // 获取分页后的权限数据
    const getPage = async () => {
        await getPermissionPage(currentPage.value, pageSize.value).then((res:any) => {
            permissionsTableData.value = res.data.result.rows;
            total.value = res.data.result.total;
        });
    };

    // 搜索权限
    const searchPermissions = async (permission: any) => {
        await searchPermission(permission).then((res: any) => {
            permissionsTableData.value = res.data.result;
            total.value = res.data.result.length;
        });
    };
    // 获取所有权限
    const getAllPermissions = async () => {
        await searchPermission({}).then(
            (res: any) => {
                allPermissions.value = res.data.result;
            }
        )
    };

    // 添加权限
    const addPermissions = async (permission: any) => {
        await addPermission(permission).then((res: any) => {
            MessagePlugin.success('添加成功');
            getPage();
        })
    };
    // 修改权限
    const updatePermissions = async (permission: any) => {
        await updatePermission(permission).then(() => {
            MessagePlugin.success('修改成功');
            getPage();
        })
    };
    // 删除权限
    const deletePermissions = async (ids: number[]) => {
        await deletePermission(ids).then(() => {
            MessagePlugin.success('删除成功');
            getPage();
        })
    };
    // table选中回调
    const handleSelectionChange = (selection: PermissionEntity[]) => {
        selectedIds.value = selection.map(item => item.mId!);
    }





    return {
        allPermissions,
        permissionsTableData,
        currentPage,
        total,
        pageSize,
        selectedIds,
        permissionEditFormData,
        PERMISSION_EDIT_FORM_RULES,
        permissionAddFormData,
        PERMISSION_ADD_FORM_RULES,
        getPage,
        searchPermissions,
        getAllPermissions,
        addPermissions,
        updatePermissions,
        deletePermissions,
        handleSelectionChange,
    };
});
