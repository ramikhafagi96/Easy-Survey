const express = require('express');
const router = express.Router();
const { chargePayment } = require('../services/stripe');
const userServices = require('../db/models_services/user_services');


router.get('/', (req, res) => {
    res.send(req.user);
});

router.post('/payment', async (req, res) => {
    const charge = await chargePayment(req.body.id);
    const user = await userServices.updateUserCredits(req.user.googleId);
    res.send(user);
})

module.exports = function (indexRouter) {
    indexRouter.use("/user", router);
};