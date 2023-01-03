//helper functions for calculating the reward points

//#1. calculate reward points for each transaction
export const calculateRewardPoints = (transactionData) => {
  const rewardPoints = transactionData.map((transaction) => {
    const { transaction_amount, transaction_date } = transaction;
    const transaction_month = transaction_date.split("-")[1];
    const transaction_year = transaction_date.split("-")[0];
    let reward_points = 0;
    if (transaction_amount > 50 && transaction_amount <= 100) {
      reward_points = transaction_amount - 50;
    } else if (transaction_amount > 100) {
      reward_points = 50 + (transaction_amount - 100) * 2;
    }
    return {
      ...transaction,
      reward_points,
      transaction_month,
      transaction_year,
    };
  });
  return rewardPoints;
};

//#2. calculate total reward points per customer per month
export const calculateTotalRewardPointsPerCustomerPerMonth = (
  transactionData
) => {
  const data_with_reward_points = calculateRewardPoints(transactionData);
  const totalRewardPointsPerCustomerPerMonth = data_with_reward_points.reduce(
    (acc, transaction) => {
      const {
        customer_id,
        customer_name,
        transaction_month,
        transaction_year,
        reward_points,
      } = transaction;
      const key = `${customer_id}-${transaction_month}-${transaction_year}`;
      if (!acc[key]) {
        acc[key] = {
          customer_id,
          customer_name,
          transaction_month,
          transaction_year,
          reward_points,
        };
      } else {
        acc[key].reward_points += reward_points;
      }
      return acc;
    },
    {}
  );
  //return after sorting by customer_id
  return Object.values(totalRewardPointsPerCustomerPerMonth).sort(
    (a, b) => a.customer_id - b.customer_id
  );
};

//#3. calculate total reward points per customer
export const calculateTotalRewardPointsPerCustomer = (transactionData) => {
  const data_with_reward_points = calculateRewardPoints(transactionData);
  const totalRewardPointsPerCustomer = data_with_reward_points.reduce(
    (acc, transaction) => {
      const { customer_id, customer_name, reward_points } = transaction;
      if (!acc[customer_id]) {
        acc[customer_id] = {
          customer_id,
          customer_name,
          reward_points,
        };
      } else {
        acc[customer_id].reward_points += reward_points;
      }
      return acc;
    },
    {}
  );
  //return after sorting by customer_id
  return Object.values(totalRewardPointsPerCustomer).sort(
    (a, b) => a.customer_id - b.customer_id
  );
};
