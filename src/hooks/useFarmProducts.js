import {useQuery} from '@tanstack/react-query';
import {fetchProductsFromFarm} from '../api/productApi';

export const useFarmProducts = farmCode => {
  return useQuery({
    queryKey: ['farmProducts', farmCode],
    queryFn: () => fetchProductsFromFarm(farmCode),
    enabled: !!farmCode,
  });
};
