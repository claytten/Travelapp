import mongoose from 'mongoose';

const mapSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  coordinate: {
    type: String,
    trim: true,
    unique: true,
  },
});

/**
 * Checking request if coordinate is taken
 * @param {string} coordinate
 * @param {ObjectId} {excluderMapId}
 * @return {Promise<boolean>}
 */
mapSchema.statics.isMapTaken = async function (coordinate, excluderMapId) {
  const map = await this.findOne({ coordinate, _id: { $ne: excluderMapId } });
  return !!map;
};

export default mongoose.model('Map', mapSchema);
