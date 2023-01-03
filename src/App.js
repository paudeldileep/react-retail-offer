import "./App.css";
import { useEffect, useState } from "react";
import { getTransactions } from "./services/api";
import {
  calculateTotalRewardPointsPerCustomer,
  calculateTotalRewardPointsPerCustomerPerMonth,
} from "./services/helper";

import DataTable from "react-data-table-component";
import Loader from "./components/Loader";

// defining the columns for the data table
//columns for the per month data
const perMonthColumns = [
  { name: "Customer Name", selector: (row) => row.customer_name },
  { name: "Month", selector: (row) => months[row.transaction_month - 1] },
  { name: "Year", selector: (row) => row.transaction_year },
  { name: "Reward Points", selector: (row) => row.reward_points },
];

//columns for the per customer data
const perCustomerColumns = [
  { name: "Customer Name", selector: (row) => row.customer_name },
  { name: "Total Reward Points", selector: (row) => row.reward_points },
];

//for getting the month name from the month number
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  //state for storing the data
  const [perMonthData, setPerMonthData] = useState([]);
  const [perCustomerData, setPerCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //async function for fetching the data
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      const totalRewardPointsPerCustomerPerMonth =
        calculateTotalRewardPointsPerCustomerPerMonth(data);
      const totalRewardPointsPerCustomer =
        calculateTotalRewardPointsPerCustomer(data);
      setPerMonthData(totalRewardPointsPerCustomerPerMonth);
      setPerCustomerData(totalRewardPointsPerCustomer);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  //fetching the data on component mount
  useEffect(() => {
    fetchData();
    // cleaning up the state on unmount
    return () => {
      setPerMonthData([]);
      setPerCustomerData([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  return (
    <div className="App">
      <header className=" h-10 w-full bg-gray-400 justify-center items-center">
        <h1 className="text-2xl text-center">Reward Points</h1>
      </header>
      <div className="flex flex-col justify-center items-center">
        {/* error component */}
        {error && (
          <div className="text-red-500">
            <p>{error}</p>
          </div>
        )}
        {/* first column displaying customer reward points per month for each customer */}
        <div className="w-3/4 mt-10 flex flex-col justify-center items-center">
          <h2 className="text-center my-2">
            Customer Points Per Month Per Customer
          </h2>
          <DataTable
            columns={perMonthColumns}
            data={perMonthData}
            pagination
            highlightOnHover
            pointerOnHover
            progressPending={loading}
            progressComponent={<Loader />}
          />
        </div>

        {/* second column displaying total reward points per customer */}

        <div className="w-1/2 mt-10">
          <h2 className="text-center my-2">Total Points Per Customer</h2>
          <DataTable
            columns={perCustomerColumns}
            data={perCustomerData}
            pagination
            highlightOnHover
            pointerOnHover
            progressPending={loading}
            progressComponent={<Loader />}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
