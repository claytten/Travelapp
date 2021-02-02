import mongoose from 'mongoose';
import config from '../src/config/index.mjs';
import { AdminModel } from '../src/models/index.mjs';
import { getAdminByEmail } from '../src/services/admin/admin.service.mjs';

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/dbname';

const setupSeeder = async () => {
  /**
   * Seeders List
   * order is important
   * @type {Object}
   */
  const adminList = [
    {
      name: 'Superadmin',
      email: 'superadmin@admin.com',
      password: 'Superadmin123',
    },
  ];
  await mongoose.connect(mongoURL, config.mongoose.options, async () => {
    console.log('✌️ DB loaded and connected!');

    if (process.env.NODE_ENV === 'dropSeeding') {
      /* Drop the DB */
      await mongoose.connection.db.dropDatabase();
      console.log('✌️ DB Successfully empty!');
    }
  });
  await adminList.map(async (item) => {
    const admin = await getAdminByEmail(item.email);
    if (!admin) {
      await AdminModel.adminModel.create(item);
    }
  });
};

setupSeeder();
