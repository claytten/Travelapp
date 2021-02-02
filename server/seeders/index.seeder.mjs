import mongoose from 'mongoose';
import config from '../src/config/index.mjs';
import adminSeeder from './admin.seeder.mjs';

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/dbname';

const setupSeeder = async () => {
  await mongoose.connect(mongoURL, config.mongoose.options, async () => {
    console.log('✌️ DB loaded and connected!');

    if (process.env.NODE_ENV === 'dropSeeding') {
      /* Drop the DB */
      console.log('✌️ DB Successfully empty!');
      await mongoose.connection.db.dropDatabase();
    }
  });
  return Promise.all(adminSeeder())
    .then(() => mongoose.disconnect())
    .catch((err) => console.log(err));
};

setupSeeder();
