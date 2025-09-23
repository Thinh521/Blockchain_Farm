import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../../screens/SmartConctract/contractABI.json';
import {getWishlistFarms, addWishlistFarm, removeWishlistFarm} from '../../api/wishlist/wishlistApi';

export const fetchAllFarms = async () => {
  const rpcProvider = new ethers.JsonRpcProvider('https://rpc.zeroscan.org');
  const contractRead = new ethers.Contract(CONTRACT_ADDRESS, contractArtifact.abi, rpcProvider);
  const allFarms = await contractRead.getAllFarms();

  return allFarms.map(farm => ({
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
};

export const fetchWishlist = async () => {
  const farms = await fetchAllFarms();
  const res = await getWishlistFarms();
  const wishlistFarms = res?.wishlist?.farms || [];
  const wishlistCodes = new Set(wishlistFarms.map(f => f.farmCode));

  const matchedFarms = farms.filter(f => wishlistCodes.has(f.farmCode));
  return {
    farms: matchedFarms,
    favorites: new Set(matchedFarms.map(f => f.farmCode)),
  };
};

export const toggleFavoriteFarm = async (farmCode, favorites, setFavorites, setWishlistFarms) => {
  if (favorites.has(farmCode)) {
    await removeWishlistFarm(farmCode);
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(farmCode);
      return newSet;
    });
    setWishlistFarms(prev => prev.filter(f => f.farmCode !== farmCode));
  } else {
    await addWishlistFarm(farmCode);
    setFavorites(prev => new Set([...prev, farmCode]));
    // fetch lại để đồng bộ
    const {farms, favorites: favs} = await fetchWishlist();
    setWishlistFarms(farms);
    setFavorites(favs);
  }
};
