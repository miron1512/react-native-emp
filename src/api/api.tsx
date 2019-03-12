import { BASE_URL, HEADERS, PAGE_SIZE } from './constants';
import { getUserToken } from '../services/storage';

export const getToken = async (username: string, password: string) => {
  const response = await fetch(
    `${BASE_URL}/index.php/rest/V1/integration/customer/token`,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await response.json();

  if (typeof data !== 'string') {
    throw Error('You have entered an invalid username or password');
  }

  return data;
};

export const getProducts = async (
  page: number,
  pageSize: number = PAGE_SIZE
) => {
  const url =
    `${BASE_URL}/rest/V1/products` +
    `?searchCriteria[pageSize]=${pageSize}` +
    `&searchCriteria[currentPage]=${page}`;

  const response = await fetch(url, { headers: HEADERS });

  const data = await response.json();

  if (!data.items) {
    throw Error();
  }

  return data;
};

export const createCart = async () => {
  const userToken = await getUserToken();
  if (!userToken) {
    return null;
  }
  const response = await fetch(`${BASE_URL}/rest/default/V1/carts/mine`, {
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${userToken.token}`,
    },
  });

  const data = await response.json();

  return { cartId: data.id as string };
};

export const addProductToCart = async (
  cartId: string,
  product: any,
  quantity: number = 1
) => {
  const usetToken = await getUserToken();
  if (!usetToken) {
    return null;
  }

  const { sku } = product;

  const response = await fetch(`${BASE_URL}/rest/default/V1/carts/mine/items`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${usetToken.token}`,
    },
    body: JSON.stringify({
      cartItem: {
        sku,
        qty: quantity,
        quote_id: cartId,
      },
    }),
  });

  const data = await response.json();

  return data;
};
