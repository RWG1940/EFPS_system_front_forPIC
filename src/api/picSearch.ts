import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000';

export const picSearchApi = {
  // 上传并搜索图片
  async searchImage(file: File, topk: number = 10, tableName: string = '') {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('topk', topk.toString());
    if (tableName) {
      formData.append('table_name', tableName);
    }

    try {
      const response = await axios.post(`${baseURL}/img/search`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error while searching for image:', error);
      throw error;
    }
  },

 // 上传图片
async uploadImage(file: File | null, url: string | null = null, tableName: string, newPath: string) {
  if (!tableName || !newPath) {
    throw new Error('tableName 和 newPath 是必传参数');
  }

  const formData = new FormData();

  // 仅在 file 存在时添加文件
  if (file) {
    formData.append('image', file);
  }

  // 如果有 url 参数，添加到 formData
  if (url) {
    formData.append('url', url);
  }

  // 构建带有查询参数的 URL
  const requestUrl = `${baseURL}/img/upload?table_name=${encodeURIComponent(tableName)}&new_path=${encodeURIComponent(newPath)}`;

  try {
    const response = await axios.post(requestUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data;
  } catch (error) {
    console.error('Error while uploading image:', error);
    throw error;
  }
},

  // 获取图片总数
  async getImageCount(tableName: string = '') {
    try {
      const response = await axios.post(`${baseURL}/img/count`, { table_name: tableName });
      return response.data;
    } catch (error) {
      console.error('Error while getting image count:', error);
      throw error;
    }
  },

  // 获取图片数据
  async getImage(imagePath: string) {
    try {
      const response = await axios.get(`${baseURL}/data?image_path=${encodeURIComponent(imagePath)}`);
      return response.data;
    } catch (error) {
      console.error('Error while getting image data:', error);
      throw error;
    }
  },

  // 删除指定表中的指定milvus_id数据
  async deleteById(tableName: string, milvusId: number) {
    
    try {
     
 
      if (isNaN(milvusId)) {
        throw new Error('milvusId must be a valid number');
      }
      const response = await axios.delete(`${baseURL}/img/delete/${tableName}/${milvusId}`);
      return response.data;
    } catch (error) {
      console.error('Error while deleting data:', error);
      throw error;
    }
  },

  // 获取指定表的所有数据（分页）
  async getAllData(tableName: string, page: number = 1, size: number = 10) {
    try {
      const response = await axios.get(`${baseURL}/img/all/${tableName}`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error('Error while getting all data:', error);
      throw error;
    }
  },

  // 加载图源目录
  async loadImageSource(filePath: string, tableName: string) {
    try {
      const response = await axios.post(`${baseURL}/img/load`, {
        Table: tableName,
        File: filePath
      });
      return response.data;
    } catch (error) {
      console.error('Error while loading image source:', error);
      throw error;
    }
  },

  // 获取加载进度
  async getProgress(cachePath: string = './tmp') {
    try {
      const response = await axios.get(`${baseURL}/progress`, {
        params: { cache_path: cachePath }
      });
      return response.data;
    } catch (error) {
      console.error('Error while getting progress:', error);
      throw error;
    }
  },

  // 删除表
  async dropTable(tableName: string) {
    try {
      const response = await axios.post(`${baseURL}/img/drop`, null, {
        params: { table_name: tableName }
      });
      return response.data;
    } catch (error) {
      console.error('Error while dropping table:', error);
      throw error;
    }
  }
};
