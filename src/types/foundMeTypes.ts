export interface foundMeData {
    eName?: string;
    eUsername?: string;
    eId?: string;
    ePhone?: string;
}
export const FOUND_FORM_RULES = {
    eName: [{ required: true, message: '请输入姓名' }],
    eUsername: [{ required: true, message: '请输入用户名' }],
    eId: [{ required: true, message: '请输入身份证号' }],
    ePhone: [{ required: true, message: '请输入手机号' }]
}