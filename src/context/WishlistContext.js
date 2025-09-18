import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  getWishlistFarms,
  addWishlistFarm,
  removeWishlistFarm,
} from '../api/wishlist/wishlistApi';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../screens/SmartConctract/contractABI.json';

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  
  const [favorites, setFavorites] = useState(new Set());
  const [wishlistFarms, setWishlistFarms] = useState([]);
  const [loading, setLoading] = useState(false);

  // 👉 Hàm reset state khi logout
  const resetWishlist = useCallback(() => {
    setFavorites(new Set());
    setWishlistFarms([]);
    setLoading(false);
  }, []);

  // lấy wishlist + farms blockchain
  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);

      const rpcProvider = new ethers.JsonRpcProvider('https://rpc.zeroscan.org');

      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );
      const allFarms = await contractRead.getAllFarms();

      const formattedFarms = allFarms.map(farm => ({
        farmCode: farm.farmCode || farm[0],
        fullname: farm.fullname || farm[1],
        nameFarm: farm.nameFarm || farm[2],
        userId: farm.userId || farm[3],
        email: farm.email || farm[4],
        phone: farm.phone || farm[5],
        description: farm.description || farm[6],
        location: farm.location || farm[7],
        area: farm.area?.toString?.() || farm[8]?.toString?.() || '',
        image: Array.isArray(farm.images || farm[9])
          ? farm.images || farm[9]
          : [],
      }));

      // wishlist từ API
      const res = await getWishlistFarms();
      const wishlistFarms = res?.wishlist?.farms || [];
      const wishlistCodes = new Set(wishlistFarms.map(f => f.farmCode));

      // filter
      const matchedFarms = formattedFarms.filter(f =>
        wishlistCodes.has(f.farmCode),
      );

      setWishlistFarms(matchedFarms);
      setFavorites(new Set(matchedFarms.map(f => f.farmCode)));
    } catch (err) {
      console.log('Lỗi fetchWishlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleFavorite = async farmCode => {
    try {
      if (favorites.has(farmCode)) {
        await removeWishlistFarm(farmCode);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(farmCode);
          return newSet;
        });
        setWishlistFarms(prev =>
          prev.filter(f => f.farmCode !== farmCode),
        );
      } else {
        await addWishlistFarm(farmCode);
        setFavorites(prev => new Set([...prev, farmCode]));
        // refetch lại để đồng bộ với blockchain
        await fetchWishlist();
      }
    } catch (err) {
      console.log('Lỗi toggle wishlist:', err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        favorites,
        wishlistFarms,
        loading,
        toggleFavorite,
        fetchWishlist,
        resetWishlist, // 👈 expose hàm reset ra ngoài
      }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
