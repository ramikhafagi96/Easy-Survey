const express = require('express');
const router = express.Router();
const { chargePayment } = require('../services/stripe');
router.get('/', (req, res) => {
    res.send(req.user);
});

router.post('/payment', async (req, res) => {
    const charge = await chargePayment(req.body.id);
    console.log(charge);
})

module.exports = function (indexRouter) {
    indexRouter.use("/user", router);
};