import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TradeHistoryGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="buyPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="targetPrice" stroke="#82ca9d" />
        <Line type="monotone" dataKey="stopLoss" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
}

