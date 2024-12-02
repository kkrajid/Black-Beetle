import React, { useEffect, useState } from 'react'
import { Users, Activity, Diamond, Loader } from 'lucide-react'
import { getUserStats, getUsers } from '../AdminUserList/userApi'

export function AdminUsers() {
  const [userStats, setUserStats] = useState(null)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [statsResponse, usersResponse] = await Promise.all([
          getUserStats(),
          getUsers()
        ])
        setUserStats(statsResponse.data)
        setUsers(usersResponse.data)
      } catch (err) {
        setError('Failed to fetch user data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  const metrics = [
    {
      icon: Users,
      label: "Total Users",
      value: userStats?.totalUsers || 0
    },
    {
      icon: Activity,
      label: "Quarterly Membership",
      value: userStats?.quarterlyMembers || 0
    },
    {
      icon: Diamond,
      label: "Monthly Membership",
      value: userStats?.monthlyMembers || 0
    }
  ]

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Users List</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                <metric.icon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white text-center mb-2">{metric.value}</h2>
            <p className="text-gray-400 text-center">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sr. No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mob. No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Premium Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-white">{user.serialNumber}</td>
                  <td className="px-6 py-4 text-sm text-white">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-white">{user.mobileNumber}</td>
                  <td className="px-6 py-4 text-sm">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.premiumStatus === 'Active' 
                          ? 'bg-green-500 text-white'
                          : user.premiumStatus === 'Inactive'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {user.premiumStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

