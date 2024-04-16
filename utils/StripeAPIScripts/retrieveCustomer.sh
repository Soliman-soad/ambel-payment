echo "Customer ID:"
read customerID
stripe customers retrieve $customerID
