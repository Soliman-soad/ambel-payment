const stripe = require("../../utils/stripe");

const addPaymentMethod = async (req, res, next) => {
  const paymentMethodId = req.body.id;
  const stripe_cus_id = req.body.stripe_cus_id;
  const userId = req.body.userId;
  const dashboardType = req.body.dashboardType;

  try {
    const attached = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripe_cus_id,
    });

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const last4 = paymentMethod.card.last4;

    return res.status(200).json({
      message: "Method has been added",
      data: attached,
    });
  } catch (err) {
    // next(err)
    console.log(err);
    return res.status(400).json({
      message: "Failed to add Card",
      error: err,
    });
  }
};

const addSubscriptionMethod = async (req, res, next) => {
  const paymentMethodId = req.body.id;
  const stripe_cus_id = req.body.stripe_cus_id;

  try {
    const attached = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripe_cus_id,
    });

    return res.status(200).json({
      message: "Subscription Method has been added",
      data: attached,
    });
  } catch (err) {
    // next(err)
    return res.status(400).json({
      message: "Failed to add Subscription method",
      error: err,
    });
  }
};

const savedMethodList = async (req, res, next) => {
  const customer_id = req.params.id;
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      customer_id,
      { type: "card" }
    );
    return res.status(200).json({
      message: "Saved method list",
      data: paymentMethods,
    });
  } catch (err) {
    next(err);
  }
};

const removeMethod = async (req, res, next) => {
  const pm_id = req.params.id;
  const userId = req.body.userId;
  const dashboardType = req.body.dashboardType;

  try {
    const paymentMethod = await stripe.paymentMethods.detach(pm_id);
    const last4 = paymentMethod?.card?.last4;

    return res.status(200).json({
      message: "Method has been removed",
      data: paymentMethod,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addPaymentMethod,
  savedMethodList,
  removeMethod,
  addSubscriptionMethod,
};
