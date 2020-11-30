const { Wallet } = require("../models");
const sequelize = require("sequelize");

class WalletController {
    static async checkBalance(req, res) {
        const UserId = req.userData.id;
        try {
            const userWallet = await Wallet.findOne({
                where: { UserId },
            },
                {
                    attributes: { exclude: [['createdAt', 'updatedAt']] },
                })
            if (!userWallet) {
                return res.status(404).json({ msg: 'Please activate wallet!' })
            } else {
                res.status(200).json(userWallet);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = WalletController;