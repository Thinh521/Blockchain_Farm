export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^(0|\+84)[0-9]{9}$/; // số VN: 10 số, bắt đầu 0 hoặc +84
  return regex.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6; // ví dụ yêu cầu tối thiểu 6 ký tự
};
