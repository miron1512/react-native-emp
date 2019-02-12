export interface Product {
  id: number;
  name: string;
  price: string;
};

export interface ProductItemProps {
  onPress: (product: Product) => void;
  product: Product;
  style?: any;
};
