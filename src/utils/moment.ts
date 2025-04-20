import moment from 'moment';

// 格式化日期函数
export const formatDate = (date: string | Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};
export const formatDate2 = (date: string | Date) => {
  
  return moment(date).format('YYYY-MM-DD');
};
export const formatDate3 = (date: string | Date) => {
  return moment(date).format('HHmm');
};
