import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { noticesApi } from '@/api/services/notices-api';
import { createCRUDStore } from '@/stores/utils/createCRUDStore';
import type { NoticesData } from '@/types/noticesTypes';

export const useNoticesStore = createCRUDStore('notices', noticesApi);

export const noticeAddFormData = ref<NoticesData>({});
export const noticeEditFormData = ref<NoticesData>({});

export const noticesDataPublished = computed(() => {
    return useNoticesStore().data.filter((item: any) => item.status == 1)
        .sort((a: any, b: any) => {
            return new Date(b.createtime).getTime() - new Date(a.createtime).getTime();
        }) as NoticesData[];
})
// 删除过期的Notice数据
export const deleteExpiredNoticesData = async () => {
    // 过期时间 当前时间减去24小时
    const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const expiredIds: number[] = [];
    useNoticesStore().data.forEach((trend: any) => {
        const createTime = trend.createtime ? new Date(trend.createtime) : new Date();
        if (createTime < expirationTime) {
            expiredIds.push(trend.id!);
        }
    });
    // 如果有数据过期，则批量删除
    if (expiredIds.length > 0) {
        await useNoticesStore().deleteData(expiredIds).then(() => {
            MessagePlugin.success(`成功删除 ${expiredIds.length} 条过期数据`);
        })
    } else {
        MessagePlugin.info('没有找到过期数据');
    }
};


export const filterTableData = computed(() =>
    useNoticesStore().dataPages.filter(
        (data: any) =>
            !useNoticesStore().search ||
            data.header?.toLowerCase().includes(useNoticesStore().search.toLowerCase()) ||
            data.content?.toLowerCase().includes(useNoticesStore().search.toLowerCase())
    )
)
