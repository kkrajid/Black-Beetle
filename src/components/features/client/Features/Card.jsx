import React from 'react'

export function Card({ children, className = '' }) {
  return (
    <div className={`p-6 bg-[#2F2F2F] border border-[#86713E] rounded-lg backdrop-blur ${className}`}>
      {children}
    </div>
  )
}

