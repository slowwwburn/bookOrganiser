import CouponService from '../services/CouponService';
import Util from '../utils/Utils'

const util = new Util()

export default class CouponController {
  static async getAllCoupons(req, res) {
    try {
      const data = await CouponService.getAllCoupons();
      if (data.length > 0) {
        util.setSuccess(200, 'All coupons retrieved', data)
      } else {
        util.setSuccess(200, 'No coupons found');
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res);
    }
  }

  static async addCoupon(req, res) {
    const newCoupon = req.body;
    try {
      const createdCoupon = await CouponService.addCoupon(newCoupon);
      util.setSuccess(200, 'Coupon successfully added', createdCoupon)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updateCoupon(req, res) {
    const alteredCoupon = req.body;
    const { id } = req.params;
    try {
      if (!Number(id)) {
        util.setError(400, 'Please input a valid numeric value');
        return util.send(res)
      }
      const updateCoupon = await CouponService.updateCoupon(id, alteredCoupon);
      if (!updateCoupon) {
        util.setError(400, `Cannot find coupon with the id: ${id}`)
        return util.send(res)
      } else {
        util.setSuccess(200, 'Coupon successfully updated', updateCoupon)
        return util.send(res)
      }
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async getACoupon(req, res) {
    const { id } = req.params;
    try {
      if (!Number(id)) {
        util.setError(400, 'Please input a valid numeric value');
        return util.send(res)
      }
      const theCoupon = await CouponService.getCoupon(id);
      if (!theCoupon) {
        util.setError(400, `Cannot find coupon with the id: ${id}`)
        return util.send(res)
      } else {
        util.setSuccess(200, 'Coupon successfully found', theCoupon)
        return util.send(res)
      }
    } catch (error) {
      util.setSuccess(400, error.message)
      return util.send(res)
    }
  }

  static async getCouponByCode(req, res) {
    const { code } = req.body;
    try {
      const theCoupon = await CouponService.getCouponByCode(code);
      if (!theCoupon) {
        util.setError(400, `Cannot find coupon with the code: ${code}`)
        return util.send(res)
      }
      const { percentage, expiryDate } = theCoupon;
      util.setSuccess(200, 'Coupon successfully found', { percentage, expiryDate })
      return util.send(res)
    } catch (error) {
      util.setSuccess(400, error.message)
      return util.send(res)
    }
  }

  static async deleteCoupon(req, res) {
    const { id } = req.params;
    try {
      if (!Number(id)) {
        util.setError(400, 'Please input a valid numeric value');
        return util.send(res)
      }
      const couponToDelete = await CouponService.deleteCoupon(id);

      if (!couponToDelete) {
        util.setError(400, `Cannot find coupon with the id: ${id}`)
        return util.send(res)
      } else {
        util.setSuccess(200, 'Coupon successfully deleted')
        return util.send(res)
      }
    } catch (error) {
      util.setSuccess(400, error.message)
      return util.send(res)
    }
  }
}
