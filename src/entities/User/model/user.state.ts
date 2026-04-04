import { createJSONStorage, atomWithStorage } from 'jotai/utils';
import { IUser } from './user.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';

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
  async (_get, set, { address, comment }: IUser) => {
    set(userAtom, {
      user: { address, comment },
      isLoading: false,
      error: null,
    });
  },
);
