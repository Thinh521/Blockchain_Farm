import api from './baseApi';
import {API_URL} from '@env';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import contractArtifact from '../screens/SmartConctract/contractABI.json';

// Lấy tất cả sản phẩm của 1 farm theo farmCode
export const getProductsByFarm = async farmCode => {
  try {
    const res = await api.get(`${API_URL}/api/farms/${farmCode}/products`);
    return res.data?.data || [];
  } catch (error) {
    console.log('Lỗi khi fetch products by farm:', error);
    return [];
  }
};

export const fetchProductsFromFarm = async farmCode => {
  if (!farmCode) return [];

  // 1. Backend
  const backendRes = await api.get(`/api/farms/${farmCode}/products`);
  const backendCodes = (backendRes.data?.data || []).map(p => p.productCode);

  // 2. Smart Contract
  const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
  const contractRead = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    rpcProvider,
  );

  const scProducts = await contractRead.getProductByFarmCode(farmCode);

  // 3. Format dữ liệu
  const formatted = scProducts.map(product => {
    const images =
      typeof product.image === 'string'
        ? product.image
            .split(/[,|]/)
            .map(url => url.trim())
            .filter(Boolean)
        : [];

    return {
      farmCode: product.farmCode,
      productCode: product.productCode,
      categoryName: product.categoryName,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      area: product.area,
      image: images,
      description: product.description,
    };
  });

  // 4. Chỉ giữ sản phẩm tồn tại ở cả backend
  return formatted.filter(p => backendCodes.includes(p.productCode));
};
