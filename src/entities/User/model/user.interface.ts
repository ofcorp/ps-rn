export interface IUser {
  address: string;
  comment: string;
  cart: IUserCartItem[];
}

export interface IUserCartItem {
  productId: number;
  name: string;
  subTitle: string;
  size: string;
  price: number;
  quantity: number;
}
