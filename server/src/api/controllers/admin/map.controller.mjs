import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.mjs';
import { getMaps, storingMap, updatingMap, singleDestroy, saveMapImage } from '../../../services/index.mjs';
import ApiError from '../../../utils/ApiError.mjs';

export const getAllMaps = catchAsync(async (req, res) => {
  const map = await getMaps();
  res.send({ success: true, data: map });
});

export const storeMap = catchAsync(async (req, res) => {
  const map = await storingMap(req.body);
  res.send({ success: true, message: 'Create Map Successfully', data: map });
});

export const updateMap = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  await updatingMap(req.params.mapId, req.body);
  res.send({ success: true, message: 'Update Map Successfully!' });
});

export const mapUploadPhoto = catchAsync(async (req, res) => {
  if (!req.file.path) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed Upload Image');
  }
  await saveMapImage(req.params.mapId, req.file.path);
  res.status(httpStatus.NO_CONTENT).send();
});

export const destroyMapSingle = catchAsync(async (req, res) => {
  await singleDestroy(req.params.mapId);
  res.send({ success: true, message: 'data successfully destroyed!' });
});

export const destroyMultipleMap = catchAsync(async (req, res) => {
  await req.body.id.map(async (item) => {
    await singleDestroy(item);
  });
  res.send({ success: true, message: 'datas successfully destroyed!' });
});
