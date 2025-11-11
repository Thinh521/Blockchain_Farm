export const formatCurrency = value => {
  if (!value) return '0 ₫';
  try {
    return Number(value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  } catch (error) {
    return `${value} ₫`;
  }
};
