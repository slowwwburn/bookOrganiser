import db from '../src/models'

export default class CouponService {
  static async getAllCoupons() {
    try {
      return await db.Coupons.findAll();
    } catch (err) {
      throw err;
    }
  }

  static async addCoupon(coupon) {
    try {
      return await db.Coupons.create(coupon);
    } catch (error) {
      throw error;
    }
  }

  static async updateCoupon(id, update) {
    try {
      const coupon = await db.Coupons.findOne({
        where: { id: Number(id) },
      });

      if (coupon) {
        await db.Coupons.update(update, { where: { id: Number(id) } });
        return update;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getCoupon(id) {
    try {
      const coupon = await db.Coupons.findOne({
        where: { id: Number(id) },
      });

      return coupon;
    } catch (error) {
      throw error;
    }
  }

  static async getCouponByCode(code) {
    try {
      const coupon = await db.Coupons.findOne({
        where: { code },
      });
      return coupon;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCoupon(id) {
    try {
      const coupon = await db.Coupons.findOne({ where: { id: Number(id) } });

      if (coupon) {
        const deletedCoupon = await db.Coupons.destroy({
          where: { id: Number(id) },
        });
        return deletedCoupon;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
