export interface IProduct {
  id: number;
  name: string;
  subTitle: string;
  type: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export const Categories = {
  all: 'Все',
  cappuccino: 'Капучино',
  macchiato: 'Маккиято',
  latte: 'Латте',
  americano: 'Американо',
} as const;
