import catchAsync from '../../../utils/catchAsync.mjs';
import { getMaps, storingMap, updatingMap, singleDestroy } from '../../../services/index.mjs';

export const getAllMaps = catchAsync(async (req, res) => {
  const map = await getMaps();
  res.send({ success: true, data: map });
});

export const storeMap = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
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
