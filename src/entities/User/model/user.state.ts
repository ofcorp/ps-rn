import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IOrder, IUser } from './user.interface';
import axios, { AxiosError } from 'axios';
import { API } from '@/entities/Products/api/api';

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

export const processOrderAtom = atom(
  get => get(userAtom),
  async (get, set) => {
    const currentState = await get(userAtom);
    if (!currentState.user || !currentState.user.cart || currentState.user.cart.length === 0) {
      return;
    }

    try {
      const response = await axios.post<IOrder>(API.order, {
        address: currentState.user.address,
        notes: currentState.user.comment,
        orderItems: currentState.user.cart.map(item => ({
          id: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),
      });
      if (response.status !== 200) {
        set(userAtom, {
        ...currentState,
        error: `Failed to process order: ${response.statusText}`,
      });
      return;
      }
    } catch (error) {
      const errorMessage = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Unknown error';
      set(userAtom, {
        ...currentState,
        error: errorMessage,
      });
      return;
    }

    set(userAtom, {
      ...currentState,
      user: {
        ...currentState.user,
        cart: [],
      },
    });
  },
);
