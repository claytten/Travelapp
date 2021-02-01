import { join, resolve } from 'path';
import { mkdir } from 'fs';
import { linkStorage } from '../config/storage.mjs';

const syncLink = () => {
  // eslint-disable-next-line array-callback-return
  return linkStorage.map((item) => {
    mkdir(join(resolve(), item.toString()), (err) =>
      !err ? console.log('Link Storage Successfully Sync') : console.log('Link Storage Already sync'),
    );
  });
};

syncLink();
