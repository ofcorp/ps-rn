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

export interface IOrderItem {
  id: number;
  size: string;
  quantity: number;
}

export interface IOrder {
  address: string;
  notes: string;
  orderItems: IOrderItem[];
}
