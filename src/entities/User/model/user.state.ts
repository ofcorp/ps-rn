import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IUser } from './user.interface';

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
};

const storage = createJSONStorage<IUserState>(() => AsyncStorage);
export const userAtom = atomWithStorage<IUserState>('user', initialState, storage);

export const updateUserAtom = atom(
  get => get(userAtom),
  async (_get, set, { address, comment, cart }: IUser) => {
    set(userAtom, {
      user: {
        address,
        comment,
        cart: Array.isArray(cart) ? cart : [],
      },
      isLoading: false,
      error: null,
    });
  },
);

export const clearUserAtom = atom(
  get => get(userAtom),
  async (_get, set) => {
    set(userAtom, initialState);
  },
);

export const addToCartAtom = atom(
  get => get(userAtom),
  async (get, set, item: IUser['cart'][number]) => {
    const currentState = await get(userAtom);
    if (!currentState.user) {
      return;
    }

    const currentCart = Array.isArray(currentState.user.cart) ? currentState.user.cart : [];

    const existingItemIndex = currentCart.findIndex(
      cartItem => cartItem.productId === item.productId && cartItem.size === item.size,
    );

    let updatedCart;
    if (existingItemIndex >= 0) {
      updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart = [...currentCart, item];
    }

    set(userAtom, {
      ...currentState,
      user: {
        ...currentState.user,
        cart: updatedCart,
      },
    });
  },
);

export const removeFromCartAtom = atom(
  get => get(userAtom),
  async (get, set, { productId, size }: { productId: number; size: string }) => {
    const currentState = await get(userAtom);
    if (!currentState.user) {
      return;
    }

    const currentCart = Array.isArray(currentState.user.cart) ? currentState.user.cart : [];

    const updatedCart = currentCart.filter(
      cartItem => !(cartItem.productId === productId && cartItem.size === size),
    );

    set(userAtom, {
      ...currentState,
      user: {
        ...currentState.user,
        cart: updatedCart,
      },
    });
  },
);
