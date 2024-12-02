

// Mock data
const mockUserStats = {
  totalUsers: 1000,
  quarterlyMembers: 250,
  monthlyMembers: 750
};

const mockUsers = [
  {
    id: 1,
    serialNumber: 1,
    username: "John Doe",
    mobileNumber: "+1 234-567-8900",
    premiumStatus: "Active"
  },
  {
    id: 2,
    serialNumber: 2,
    username: "Jane Smith",
    mobileNumber: "+1 234-567-8901",
    premiumStatus: "Inactive"
  },
  {
    id: 3,
    serialNumber: 3,
    username: "Bob Johnson",
    mobileNumber: "+1 234-567-8902",
    premiumStatus: "Expired"
  }
];

export const getUserStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockUserStats });
    }, 500);
  });
};

export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockUsers });
    }, 500);
  });
};

