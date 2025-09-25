// utils/cloudinary.js
export const getOptimizedImage = (url, width = 400, height = 300) => {
  if (!url) return null;
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`
  );
};
