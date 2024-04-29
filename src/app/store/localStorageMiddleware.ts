import { Middleware} from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action: any) => {
    const result = next(action);
    if(action.type.startsWith('productItem/')){
      localStorage.setItem('cart', JSON.stringify(getState().cartitem.cartItems));
    }
    return result;
  };
};

export default localStorageMiddleware;