import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  }, [validationRules, values]);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const setTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field when it loses focus
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  }, [validateField, values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  };
};

// Common validation rules
export const validationRules = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return '';
  },
  
  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  },
  
  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return '';
  },
  
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return '';
  },
  
  phone: (value) => {
    if (value && !/^[\+]?[\d\s\-\(\)]+$/.test(value)) {
      return 'Please enter a valid phone number';
    }
    return '';
  },
  
  number: (value) => {
    if (value && isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    return '';
  },
  
  positive: (value) => {
    if (value && Number(value) <= 0) {
      return 'Must be a positive number';
    }
    return '';
  }
};