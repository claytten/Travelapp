import { AdminModel } from '../src/models/index.mjs';

const mapSeeder = () => {
  /**
   * Map Seeder List
   * order is important
   * @type {Object}
   */
  const mapList = [
    {
      name: 'bayat',
      image: null,
      coordinate: '-7.784022, 110.650528',
    },
  ];
  return mapList.map(async (item) => {
    const map = await AdminModel.mapModel.findOne({ coordinate: item.coordinate });
    if (!map) {
      console.log('✌️ Creating Map : ', item.coordinate);
      await AdminModel.mapModel.create(item);
    }
  });
};

export default mapSeeder;
