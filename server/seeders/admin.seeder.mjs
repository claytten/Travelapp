import { AdminModel } from '../src/models/index.mjs';
import { getAdminByEmail } from '../src/services/admin/admin.service.mjs';

const adminSeeder = () => {
  /**
   * Admin Seeder List
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
  return adminList.map(async (item) => {
    const admin = await getAdminByEmail(item.email);
    if (!admin) {
      console.log('✌️ Creating Admin Account : ', item.email);
      await AdminModel.adminModel.create(item);
    }
  });
};

export default adminSeeder;
