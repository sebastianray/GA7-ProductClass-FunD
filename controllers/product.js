const { Products, ProductServices, Subscriptions, Expenses, Wallet } = require("../models");
const sequelize = require("sequelize");
const { subslimitdates } = require('../helpers/period')

class ProductController {
  static async getAllProduct(req, res) {
    try {
      const appProduct = await Products.findAll({
        attributes: ['name', 'icon', 'backdrop', 'details'],
      });
      res.status(200).json(appProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params
    try {
      const appProduct = await Products.findOne({
        where: { id },
        attributes: ['name', 'icon', 'backdrop', 'details'],
        include: {
          model: ProductServices,
          attributes: ["id", "service_type", "cost"]
        }
      });
      if (!appProduct) {
        res.status(404).json({ msg: "Your product is not found!" })
      } else {
        res.status(200).json(appProduct);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async subscribeProduct(req, res) {
    const UserId = req.userData.id;
    const { ProductsId, ProductServiceId } = req.params;
    try {
      const foundExistSub = await Subscriptions.findOne({
        where: { UserId, ProductsId: ProductsId }
      })
      if (foundExistSub) {
        res.status(400).json({
          msg: 'Product is already subscribed'
        })
      } else {
        const found = await ProductServices.findOne({
          where: { ProductsId: ProductsId, id: ProductServiceId },
        })
        const findWallet = await Wallet.findOne({
          where: { UserId }
        })
        if (findWallet) {
          if (found.cost > findWallet.balance) {
            res.status(400).json({ msg: 'Your balance is not enough, please top up your wallet' })
          } else {
            const update = await Wallet.update(
              {
                balance: Number(findWallet.balance) - Number(found.cost)
              },
              {
                where: { UserId }
              });
            if (update) {
              const subscribe = await Subscriptions.create({
                start_date: new Date(),
                UserId,
                ProductServicesId: ProductServiceId,
                ProductsId: ProductsId
              })
              if (subscribe) {
                const expense = await Expenses.create({
                  title: found.service_type,
                  cost: found.cost,
                  repeat: found.repeat,
                  start_date: subscribe.start_date,
                  limit_date: subslimitdates(subscribe.start_date),
                  month_created: new Date(subscribe.createdAt).getMonth() + 1,
                  UserId
                })
                res.status(201).json({ subscribe, expense });
              }
            }
          }
        }
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ProductController;
