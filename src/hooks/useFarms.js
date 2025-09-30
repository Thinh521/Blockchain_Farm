import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, API_URL} from '@env';
import contractArtifact from '../screens/SmartConctract/contractABI.json';
import {useQuery} from '@tanstack/react-query';

const RPC_URL = 'https://rpc.zeroscan.org';

const fetchFarms = async () => {
  const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);

  const contractRead = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    rpcProvider,
  );

  // Lấy farms từ smart contract
  const farmsData = await contractRead.getAllFarms();

  const farms = farmsData.map(farm => ({
    farmCode: farm.farmCode || farm[0],
    fullname: farm.fullname || farm[1],
    nameFarm: farm.nameFarm || farm[2],
    userId: farm.userId || farm[3],
    email: farm.email || farm[4],
    phone: farm.phone || farm[5],
    description: farm.description || farm[6],
    location: farm.location || farm[7],
    area: farm.area?.toString?.() || farm[8]?.toString?.() || '',
    image: Array.isArray(farm.images || farm[9]) ? farm.images || farm[9] : [],
  }));

  // Lấy danh sách farmCode từ BE
  const res = await fetch(`${API_URL}/api/farms`);
  const json = await res.json();
  const validCodes = json.code === '200' ? json.data : [];

  // Chỉ giữ farm nào có trong BE
  return farms.filter(f => validCodes.includes(f.farmCode));
};

export const useFarms = () => {
  const query = useQuery({
    queryKey: ['farms'],
    queryFn: fetchFarms,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    farms: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
