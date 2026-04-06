import axios, { AxiosError } from 'axios';
import { atom } from 'jotai';
import { API } from '../api/api';
import { IProduct } from './product.model';

export interface IProductState {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}

export interface IProductDetailsState {
  product: IProduct | null;
  isLoading: boolean;
  error: string | null;
}

export const productAtom = atom<IProductState>({
  products: [],
  isLoading: false,
  error: null,
});

export const productDetailsAtom = atom<IProductDetailsState>({
  product: null,
  isLoading: false,
  error: null,
});

type LoadProductsParams = {
  type?: string;
  text?: string;
};

let currentRequestController: AbortController | null = null;
let currentProductRequestController: AbortController | null = null;

export const loadProductsAtom = atom(null, async (_get, set, params: LoadProductsParams) => {
  currentRequestController?.abort();

  const controller = new AbortController();
  currentRequestController = controller;

  set(productAtom, prev => ({
    ...prev,
    isLoading: true,
    error: null,
  }));

  try {
    const { data } = await axios.get<IProduct[]>(API.search, {
      params: {
        type: params.type,
        text: params.text,
      },
      signal: controller.signal,
    });

    if (currentRequestController !== controller) {
      return;
    }

    set(productAtom, {
      isLoading: false,
      products: data,
      error: null,
    });
  } catch (error) {
    if (axios.isCancel(error) || controller.signal.aborted) {
      return;
    }

    if (currentRequestController !== controller) {
      return;
    }

    set(productAtom, prev => ({
      ...prev,
      isLoading: false,
      error:
        error instanceof AxiosError
          ? (error.response?.data?.message ?? 'Request failed')
          : 'Unknown error',
    }));
  } finally {
    if (currentRequestController === controller) {
      currentRequestController = null;
    }
  }
});

export const loadProductByIdAtom = atom(null, async (_get, set, id: number | string) => {
  currentProductRequestController?.abort();

  const controller = new AbortController();
  currentProductRequestController = controller;

  set(productDetailsAtom, {
    product: null,
    isLoading: true,
    error: null,
  });

  try {
    const { data } = await axios.get<IProduct>(`${API.byId}${id}`, {
      signal: controller.signal,
    });

    if (currentProductRequestController !== controller) {
      return;
    }
    set(productDetailsAtom, {
      product: data,
      isLoading: false,
      error: null,
    });
  } catch (error) {
    if (axios.isCancel(error) || controller.signal.aborted) {
      return;
    }

    if (currentProductRequestController !== controller) {
      return;
    }

    set(productDetailsAtom, {
      product: null,
      isLoading: false,
      error:
        error instanceof AxiosError
          ? (error.response?.data?.message ?? 'Request failed')
          : 'Unknown error',
    });
  } finally {
    if (currentProductRequestController === controller) {
      currentProductRequestController = null;
    }
  }
});
