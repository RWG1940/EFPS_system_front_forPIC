import {jwtDecode} from 'jwt-decode';

// 定义 token 中的 claims 接口
interface Claims {
  emp:{
    eAvatarpath: string;
    id: number;
    eName: string;
    eUsername: string;
  }
}

// 解析 token 并提取字段
export const parseToken = (token: string): Claims | null => {
  try {
    const decoded = jwtDecode<Claims>(token);
    return decoded;
  } catch (error) {
    console.error('Token 解析失败:', error);
    return null;
  }
};

export const getTokenClaims = (): Claims | null => {
    const token = localStorage.getItem('token');
    if (token) {
      const claims = parseToken(token);
      if (claims) {
        return claims;
      } else {
        console.error('无法解析 token');
        return null;
      }
    } else {
      console.error('未找到 token');
      return null;
    }
}
