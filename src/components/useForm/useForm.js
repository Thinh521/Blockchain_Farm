import { useState } from 'react';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validation/validation';

export const useForm = (initialValues, rules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    if (rules[name]?.required && !value?.trim()) {
      error = 'Trường này là bắt buộc';
    } else if (rules[name]?.type === 'email' && !validateEmail(value)) {
      error = 'Email không hợp lệ';
    } else if (rules[name]?.type === 'phone' && !validatePhone(value)) {
      error = 'Số điện thoại không hợp lệ';
    } else if (rules[name]?.type === 'emailPhone') {
      if (!validateEmail(value) && !validatePhone(value)) {
        error = 'Vui lòng nhập đúng định dạng Email hoặc SĐT';
      }
    } else if (rules[name]?.type === 'password' && !validatePassword(value)) {
      error = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    validateField(name, value); // ✅ validate ngay khi nhập
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(rules).forEach(key => {
      const valid = validateField(key, values[key]);
      if (!valid) isValid = false;
    });
    return isValid;
  };

  const getFieldError = (name) => errors[name] || '';
  const isError = (name) => Boolean(errors[name]);

  return {
    values,
    errors,
    handleChange,
    validateForm,
    getFieldError,
    isError,
  };
};
