// Simulating API calls with mock data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMetrics = async () => {
  await delay(1000);
  return [
    { label: "Daily Calls", value: "1" },
    { label: "Monthly Calls", value: "1" },
    { label: "Expired Calls", value: "0" },
  ];
};

export const fetchTableData = async () => {
  await delay(1500);
  return [
    {
      stock: "TATA MOTORS",
      segment: "EQUITY",
      tradeType: "SHORT TERM",
      buyPrice: "100",
      stopLoss: "90",
      target: "120",
      expiry: "2024-12-01",
      status: "NEUTRAL",
      squareOff: "N/A",
    },
    {
      stock: "RELIANCE",
      segment: "FNO",
      tradeType: "INTRADAY",
      buyPrice: "2500",
      stopLoss: "2480",
      target: "2540",
      expiry: "2023-07-15",
      status: "ACTIVE",
      squareOff: "2520",
    },
  ];
};

export const addInput = async (data) => {
  await delay(1000);
  console.log('Adding new input:', data);
  return { success: true, message: 'Input added successfully' };
};
