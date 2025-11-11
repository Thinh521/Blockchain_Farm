import {useQuery} from '@tanstack/react-query';
import {fetchProductsFromFarm} from '../api/productApi';

export const useRelatedProducts = (farmCode, currentProductCode) => {
  return useQuery({
    queryKey: ['relatedProducts', farmCode, currentProductCode],
    queryFn: async () => {
      const allProducts = await fetchProductsFromFarm(farmCode);
      return allProducts
        .filter(p => p.productCode !== currentProductCode)
        .slice(0, 10);
    },
    enabled: !!farmCode && !!currentProductCode,
  });
};
