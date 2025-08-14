// Performance monitoring and optimization utilities

// Debounce function to limit the rate of function execution
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle function to limit function execution to once per specified interval
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy load images with intersection observer
export const lazyLoadImage = (imgElement, src) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  imageObserver.observe(imgElement);
};

// Measure and log performance metrics
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start} milliseconds`);
  }
  
  return result;
};

// Preload critical resources
export const preloadResource = (url, type = 'fetch') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  
  if (type === 'image') {
    link.as = 'image';
  } else if (type === 'script') {
    link.as = 'script';
  } else {
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
};

// Memory usage monitoring (for development)
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && performance.memory) {
    console.log('Memory Usage:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};

// Optimize bundle size by dynamically importing components
export const loadComponentAsync = (importFn) => {
  return React.lazy(importFn);
};