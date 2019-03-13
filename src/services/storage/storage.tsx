import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { USER_TOKEN, CART_ID } from './constants';

export const saveUserToken = async (token: string) => {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 2);
  const data = {
    token,
    expireDate: expireDate.toISOString(),
  };
  await Keychain.setGenericPassword(JSON.stringify(data), USER_TOKEN);

  return data;
};

export const getUserToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && typeof credentials !== 'boolean') {
      const { token, expireDate: expireDateString } = JSON.parse(
        credentials.username || '{}'
      );

      const expireDate = new Date(expireDateString);
      if (!token || !expireDateString || new Date() > expireDate) {
        await Keychain.resetGenericPassword();
        return null;
      }

      return {
        token,
        expireDate,
      };
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }

  return null;
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
