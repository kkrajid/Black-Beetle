// Mock data for premium statistics
const mockPremiumStats = {
    newUsers: 100,
    declinedUsers: 234,
    totalPremiumUsers: 100
  };
  
  const mockPremiumPlans = [
    { id: 1, amount: 999, period: 'Monthly', createdAt: '2023-11-01' },
    { id: 2, amount: 2499, period: 'Quarterly', createdAt: '2023-11-02' },
    { id: 3, amount: 1499, period: 'Monthly', createdAt: '2023-11-03' },
    // Add more mock data for pagination
  ];
  
  export const getPremiumStats = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockPremiumStats });
      }, 500);
    });
  };
  
  export const getPremiumPlans = (page = 1, perPage = 10) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(mockPremiumPlans.length / perPage);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockPremiumPlans.slice(start, end),
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: mockPremiumPlans.length
          }
        });
      }, 500);
    });
  };
  
  export const addPremiumPlan = (planData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlan = {
          id: mockPremiumPlans.length + 1,
          ...planData,
          createdAt: new Date().toISOString()
        };
        mockPremiumPlans.unshift(newPlan);
        resolve({ data: newPlan });
      }, 500);
    });
  };
  
  