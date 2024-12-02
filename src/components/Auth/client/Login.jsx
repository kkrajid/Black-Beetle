import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpHash, setOtpHash] = useState('')
  const [otpExpiry, setOtpExpiry] = useState(null)
  const [error, setError] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': 'Cr0nnL0uHfD5ZKe72pxtbGF7ESFJKr6LQPd5EXw3lgquc9ZQipg7o5c3rSsR2IrD',
        },
        body: JSON.stringify({ mobile_number: phoneNumber }),
      })

      const data = await response.json()

      if (response.ok) {
        setOtpHash(data.hash)
        setOtpExpiry(data.expiry)
        setIsOtpSent(true)
      } else {
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': 'Cr0nnL0uHfD5ZKe72pxtbGF7ESFJKr6LQPd5EXw3lgquc9ZQipg7o5c3rSsR2IrD',
        },
        body: JSON.stringify({
          mobile_number: phoneNumber,
          otp: otp,
          hash: otpHash,
          expiry: otpExpiry
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens in localStorage or secure storage
        localStorage.setItem('accessToken', data.access)
        localStorage.setItem('refreshToken', data.refresh)
        // Redirect to trades page
        navigate('/trades')
      } else {
        setError(data.error || 'Invalid OTP. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#1C1C0E]">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <img src="/black-beetle-logo.png" alt="Black Beetle" className="w-12 h-12 mr-4" />
            <div className="text-[#C4A052] text-2xl font-semibold">
              <div>Black</div>
              <div>Beetle</div>
            </div>
          </div>

          {/* Login Form */}
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-[#9A9A8B] mb-8">
            Don't have an account?{" "}
            <a href="#" className="text-[#C4A052] hover:underline">Signup</a>
          </p>

          <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-[#9A9A8B] text-sm mb-2">Phone</label>
              <div className="flex rounded-md overflow-hidden bg-[#252518] border border-[#38382C]">
                <div className="flex items-center px-3 bg-[#252518] border-r border-[#38382C]">
                  <img src="/india-flag.png" alt="India" className="w-6 h-4 mr-2" />
                  <span className="text-white">+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isOtpSent || isLoading}
                />
              </div>
            </div>

            {isOtpSent && (
              <div>
                <label htmlFor="otp" className="block text-[#9A9A8B] text-sm mb-2">OTP</label>
                <input
                  type="text"
                  id="otp"
                  className="w-full bg-[#252518] text-white px-4 py-3 rounded-md border border-[#38382C] focus:outline-none"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#C4A052] text-black py-3 rounded-md font-semibold hover:bg-[#B39042] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-xs text-center text-[#9A9A8B]">
              By logging in, you agree to follow our{" "}
              <a href="#" className="text-[#C4A052] hover:underline">terms of service</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <img
          src="/login-image.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Login

