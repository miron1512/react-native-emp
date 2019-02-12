import { AsyncStorage } from 'react-native';
import { USER_TOKEN, CART_ID } from './constants';

export const saveUserToken = async (token: string) => {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 2);
  const data = {
    token,
    expireDate: expireDate.toISOString(),
  };
  await AsyncStorage.setItem(USER_TOKEN, JSON.stringify(data));

  return data;
};

export const getUserToken = async () => {
  const { token, expireDate: expireDateString } = JSON.parse(
    (await AsyncStorage.getItem(USER_TOKEN)) || '{}'
  );

  const expireDate = new Date(expireDateString);
  if (!token || !expireDateString || new Date() > expireDate) {
    await AsyncStorage.removeItem(USER_TOKEN);
    return null;
  }

  return {
    token,
    expireDate,
  };
};

export const isUserTokenValid = async () => {
  return !!(await getUserToken());
};

export const saveCartId = async (cartId: string) => {
  await AsyncStorage.setItem(CART_ID, cartId);

  return cartId;
};

export const getCartId = async () => {
  const cartId = await AsyncStorage.getItem(CART_ID);

  if (cartId) {
    return cartId;
  }

  await AsyncStorage.removeItem(CART_ID);
  return null;
};
