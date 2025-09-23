import { useState, useCallback } from "react";
import { getWishlistFarms, addWishlistFarm, removeWishlistFarm } from "../api/wishlist/wishlistApi";

export const useWishlist = () => {
  const [favorites, setFavorites] = useState(new Set());

  // 🔹 Load wishlist từ BE
  const fetchWishlist = useCallback(async () => {
    try {
      const data = await getWishlistFarms();
      const farmList = data?.wishlist?.farms || [];
      setFavorites(new Set(farmList.map(f => String(f.farmCode))));
    } catch (err) {
      console.log("❌ fetchWishlist:", err.message);
    }
  }, []);

  // 🔹 Toggle tim
  const toggleFavorite = useCallback(async (farmCode) => {
    const code = String(farmCode);
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(code)) {
        newSet.delete(code);
      } else {
        newSet.add(code);
      }
      return newSet;
    });

    try {
      if (favorites.has(code)) {
        await removeWishlistFarm(code);
      } else {
        await addWishlistFarm(code);
      }
    } catch (err) {
      console.log("❌ toggleFavorite error:", err);
    }
  }, [favorites]);

  return { favorites, fetchWishlist, toggleFavorite };
};
