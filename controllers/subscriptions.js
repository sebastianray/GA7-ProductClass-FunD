const { Products, ProductServices, Subscriptions } = require("../models");
const sequelize = require("sequelize");

class SubscriptionController {
  static async getUserSubscriptions(req, res) {
    const UserId = req.userData.id;
    try {
      const userSubs = await Subscriptions.findAll({
        where: { UserId },
        order: [
          ['id', 'ASC']
        ],
        include: {
          model: ProductServices,
          attributes: ["service_type", "cost", 'repeat']
        }
      });
      res.status(200).json(userSubs);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async cancelSubscription(req, res) {
    const id = req.params.id;
    try {
      const result = await Subscriptions.destroy({
        where: { id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = SubscriptionController;