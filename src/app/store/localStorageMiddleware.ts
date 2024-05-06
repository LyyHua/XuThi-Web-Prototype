import { Middleware} from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action: any) => {
    const result = next(action);
    if(action.type.startsWith('productItem/')){
      localStorage.setItem('cart', JSON.stringify(getState().cartitem.cartItems));
    }
    if(action.type.startsWith('form/')){
      localStorage.setItem('formState', JSON.stringify(getState().form))
    }
    return result;
  };
};

export default localStorageMiddleware;