// import { v4 as uuidv4 } from 'uuid';

// Mock data for orders statistics
const mockOrderStats = {
  totalUsers: 100,
  totalOrders: 234,
  premiumUsers: 100
};

const mockOrders = [
  {
    id: 1,
    user: "John Doe",
    amount: 19000.00,
    payment_status: true,
    payment_id: "pay_123456789",
    signature: "sig_abcdefghijk",
    timestamp: "2023-11-30T10:30:00Z",
    premium_selected: "Monthly Premium"
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: 2800.50,
    payment_status: false,
    payment_id: "pay_987654321",
    signature: null,
    timestamp: "2023-11-29T15:45:00Z",
    premium_selected: "Quarterly Premium"
  },
  {
    id: 3,
    user: "Bob Johnson",
    amount: 3400.75,
    payment_status: true,
    payment_id: "pay_246813579",
    signature: "sig_lmnopqrstuv",
    timestamp: "2023-11-28T09:15:00Z",
    premium_selected: "Annual Premium"
  },
  {
    id: 4,
    user: "Alice Brown",
    amount: 1600.25,
    payment_status: true,
    payment_id: "pay_135792468",
    signature: "sig_wxyzabcdefg",
    timestamp: "2023-11-27T14:00:00Z",
    premium_selected: "Monthly Premium"
  },
  {
    id: 5,
    user: "Charlie Davis",
    amount: 900.00,
    payment_status: false,
    payment_id: "pay_975310864",
    signature: null,
    timestamp: "2023-11-26T11:30:00Z",
    premium_selected: "Quarterly Premium"
  },
  {
    id: 6,
    user: "Eva Wilson",
    amount: 1200.50,
    payment_status: true,
    payment_id: "pay_864209753",
    signature: "sig_hijklmnopqr",
    timestamp: "2023-11-25T16:45:00Z",
    premium_selected: "Monthly Premium"
  },
  {
    id: 7,
    user: "Frank Miller",
    amount: 800.75,
    payment_status: true,
    payment_id: "pay_753951852",
    signature: "sig_stuvwxyzabc",
    timestamp: "2023-11-24T08:00:00Z",
    premium_selected: "Annual Premium"
  }
];

export const getOrderStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockOrderStats });
    }, 500);
  });
};

export const getOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockOrders });
    }, 500);
  });
};

