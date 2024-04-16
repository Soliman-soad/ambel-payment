echo "Enter Customer ID:"
read customerID
# echo $customerID
stripe payment_methods list \
  --customer=$customerID \
  --type=card
