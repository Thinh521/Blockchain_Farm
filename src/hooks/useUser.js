import {useQuery} from '@tanstack/react-query';
import {getUser} from '../utils/storage/authStorage';
import {getUserApi} from '../api/userApi';

export const useUser = () => {
  const accessToken = getUser()?.accessToken;

  return useQuery({
    queryKey: ['user', accessToken],
    queryFn: async () => {
      if (!accessToken) return null;
      const res = await getUserApi(accessToken);
      if (res?.user) {
        return res.user;
      } else {
        throw new Error(res?.message || 'Không thể tải thông tin người dùng');
      }
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
};
