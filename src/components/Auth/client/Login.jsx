import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SVGMarkup, image2, logo } from './Login/SVGComponent'


const Login = () => {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [step, setStep] = useState('phone')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const svgBase64 = btoa(SVGMarkup)
  const encodedSVG = encodeURIComponent(image2)
  const dataURL = `data:image/svg+xml;charset=utf-8,${encodedSVG}`
  const encodeLogo = encodeURIComponent(logo)
  const encodedLogoURL = `data:image/svg+xml;charset=utf-8,${encodeLogo}`

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      setIsLoggedIn(true)
      navigate('/trades')

    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (step === 'phone') {
      if (phone === '9876543210') {
        console.log('Sending OTP to:', phone)
        setStep('otp')
      } else {
        setError('Invalid user. Please check your phone number.')
      }
    } else {
      console.log('Verifying OTP:', otp.join(''))
      if (phone === '9876543210' && otp.join('') === '4569') {
        const mockAuthToken = 'mock_auth_token_123'
        localStorage.setItem('authToken', mockAuthToken)
        setIsLoggedIn(true)
        navigate('/trades')
      } else {
        setError('Invalid OTP. Please try again.')
      }
    }
  }

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
    setError('') // Clear the error when the user starts typing
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setStep('phone')
    setPhone('')
    setOtp(['', '', '', ''])
    setError('')
  }

  if (isLoggedIn) {
    return (
      <div className="text-center text-xl w-full h-screen flex justify-center items-center">
            <div role="status" className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#D4AF37]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C33.023 2.70293 25.0059 6.05422 17.9239 10.988C12.4038 15.0601 7.58167 20.2936 3.66683 25.9492C-0.983322 33.0457 -0.983322 41.5344 3.66683 48.6309C7.58167 54.2865 12.4038 59.52 17.9239 63.5921C25.0059 68.5262 33.023 71.8775 41.7345 73.3017C46.6976 74.1335 51.7666 74.2128 56.7698 73.5291C63.2754 72.64 69.5422 70.4783 75.2124 67.1674C80.8826 63.8564 85.8452 59.461 89.8167 54.2322C92.871 50.2111 95.2932 45.7576 97.0079 40.9264C97.8624 38.5687 96.393 36.0765 93.9676 35.4394L93.9676 39.0409Z"
                  fill="#D4AF37"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
           
          </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url('data:image/svg+xml;base64,${svgBase64}')` }}
    >
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-lg overflow-hidden relative">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12  bg-opacity-50 backdrop-blur-sm">
          <div className="flex items-center mb-8">
            <img src={encodedLogoURL} alt="" className="w-32 lg:w-44 md:w-44 mr-4"/>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
          <p className="text-gray-300 mb-8">
            Don't have an account? 
            <a href="#" className="text-[#c4a052] hover:underline ml-1">Signup</a>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'phone' ? (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <div className="flex">
                  <select 
                    className="bg-[#2c2410] text-white rounded-l-md border-r border-[#3d3520] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c4a052]"
                    aria-label="Country code"
                  >
                    <option value="91">🇮🇳 +91</option>
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="flex-1 bg-[#2c2410] text-white rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c4a052]"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="otp-0" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter OTP
                </label>
                <div className="flex justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center bg-[#2c2410] text-white rounded-md border border-[#3d3520] focus:outline-none focus:ring-2 focus:ring-[#c4a052]"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#c4a052] hover:bg-[#b38d3d] text-[#1a1705] font-bold py-3 rounded-md transition duration-300 ease-in-out"
              onClick={() => setError('')} // Clear error when button is clicked
            >
              {step === 'phone' ? 'Send OTP' : 'Verify OTP'}
            </button>
          </form>
          
          <p className="text-xs text-gray-400 mt-8 text-center">
            By logging in, you agree to follow our 
            <a href="#" className="text-[#c4a052] hover:underline ml-1">
              terms of service
            </a>
          </p>
        </div>
        
        {/* Right side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src={dataURL}
            alt="Login Illustration"
            className="absolute bottom-0 right-0 h-72 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Login

