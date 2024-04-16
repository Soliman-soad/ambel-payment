const router = require('express').Router();

const {addPaymentMethod, savedMethodList, removeMethod, addSubscriptionMethod} = require("../../controllers/paymentManagement/paymentMethod")

router.post("/add", addPaymentMethod)
router.get('/list/:id' ,savedMethodList)
router.post("/remove/:id", removeMethod)
router.post('/subcription_mehtod', addSubscriptionMethod)

module.exports = router;