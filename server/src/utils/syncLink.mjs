import { join, resolve } from 'path';
import { mkdir } from 'fs';
import { linkStorage } from '../config/storage.mjs';

export const syncLink = () => {
  // eslint-disable-next-line array-callback-return
  return linkStorage.map((item) => {
    mkdir(join(resolve(), item.toString()), () => null);
  });
};
