import { transaction_data } from "./dataSet";

// mock api endpoint for getting the transactions
export const getTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (transaction_data.length === 0) {
        reject("No transactions found");
      }
      resolve(transaction_data);
    }, 1000);
  });
};
