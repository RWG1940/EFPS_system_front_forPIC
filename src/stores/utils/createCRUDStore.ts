import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

export function createCRUDStore<T>(storeName: string, api: any) {
    // 使用 defineStore 创建 store
    return defineStore(storeName, () => {
        const data = ref<T[]>([]);
        const dataPages = ref<T[]>([]);
        const pageSize = ref(10);
        const pageDataSum = ref(0);
        const currentPage = ref(1);
        const selectedIds = ref<number[]>([]);
        const search = ref('');
        const searchResultData = ref<T[]>([]);


        // 获取所有数据
        const fetchAllData = async () => {
            const res = await api.getAll();
            data.value = res.data.result;
        };

        // 获取分页数据
        const fetchPageData = async () => {
            const res = await api.getPages(currentPage.value, pageSize.value);
            dataPages.value = res.data.result.rows;
            pageDataSum.value = res.data.result.total;
        };

        // 添加数据
        const addData = async (newData: T) => {
            await api.add(newData);
            await fetchAllData();
            await fetchPageData();
            MessagePlugin.success("添加成功");
        };

        // 更新数据
        const updateData = async (updatedData: T) => {
            await api.update(updatedData);
            await fetchAllData();
            await fetchPageData();
            MessagePlugin.success("更新成功");
        };

        // 删除数据
        const deleteData = async (ids: number[]) => {
            await api.delete(ids);
            await fetchAllData();
            await fetchPageData();
            MessagePlugin.success(`成功删除 ${ids.length} 条数据`);
        };

        // 删除选中的数据
        const deleteSelectedData = async () => {
            if (selectedIds.value.length === 0) {
                MessagePlugin.warning("请先选择要删除的数据");
            } else {
                await deleteData(selectedIds.value);
            }
        };

        // 查询数据
        const searchData = async (Data:T) => {
            const res =  await api.search(Data);
            searchResultData.value = res.data.result;
        };

        // 过滤数据
        const filterTableData = computed(() =>
            dataPages.value.filter((item) => {
                const lowerSearch = search.value.toLowerCase();
                return (
                    !search.value ||
                    JSON.stringify(item).toLowerCase().includes(lowerSearch)
                );
            })
        );

        // 多选
        const handleSelectionChange = (selection: T[]) => {
            selectedIds.value = selection.map((item: any) => item.id);
        };

        return {
            data,
            dataPages,
            pageSize,
            currentPage,
            selectedIds,
            search,
            pageDataSum,
            searchResultData,

            fetchAllData,
            fetchPageData,
            addData,
            updateData,
            deleteData,
            deleteSelectedData,
            filterTableData,
            handleSelectionChange,
            searchData
        };
    });
}
