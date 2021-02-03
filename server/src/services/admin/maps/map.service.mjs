import httpStatus from 'http-status';
import { unlinkSync } from 'fs';
import { resolve, join } from 'path';
import ApiError from '../../../utils/ApiError.mjs';
import { AdminModel } from '../../../models/index.mjs';
import { getMapById } from '../admin.service.mjs';

/**
 * Get all data map from database
 * @return {Promise<Object>}
 */
export const getMaps = async () => {
  const map = await AdminModel.mapModel.find({});
  return map;
};

/**
 * Storing Image into Storage and database
 * @param {object} data
 * @return {Promise<Object>}
 */
export const storingMap = async (data) => {
  if (await AdminModel.mapModel.isMapTaken(data.coordinate)) {
    return;
  }
  const map = await AdminModel.mapModel.create(data);
  return map;
};

/**
 * Updating map
 * @param {string} mapId
 * @param {object} data
 * @return {Promise<object>}
 */
export const updatingMap = async (mapId, data) => {
  try {
    const map = await getMapById(mapId);
    if (data.image && map.image !== null) {
      unlinkSync(join(resolve(), map.image));
    }
    Object.assign(map, data);
    return map.save();
  } catch (e) {
    if (data.image) {
      unlinkSync(join(resolve(), data.image));
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'Map Not Found');
  }
};

/**
 * Single Delete with mapId
 * @param {string} mapId
 * @return {Promise}
 */
export const singleDestroy = async (mapId) => {
  try {
    const map = await getMapById(mapId);
    if (map.image) {
      unlinkSync(join(resolve(), map.image));
    }
    await map.remove();
    return map;
  } catch (e) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Map Not Found');
  }
};
