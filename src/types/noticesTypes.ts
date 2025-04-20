// 定义Notices数据类型
export interface NoticesData {
    id?: number;
    header?: string;
    content?: string;
    status?: number;
    author?: string;
    createtime?: string;
    updatetime?: string;
}

export const noticeADD_FORM_RULES = {
    header: [{ required: true, message: '标题必填' }],
    content: [{ required: true, message: '内容必填' }],
    author: [{ required: true, message: '请输入作者' }],
    status: [{ required: true, message: '请选择状态' }],
}

export const noticeEDIT_FORM_RULES = {
    header: [{ required: true, message: '标题必填' }],
    content: [{ required: true, message: '内容必填' }],
    author: [{ required: true, message: '请输入作者' }],
    status: [{ required: true, message: '请选择状态' }],
}
export const noticeStatusOptions = [
    { label: '已发布', value: 1 },
    { label: '审核中', value: 0 },
]