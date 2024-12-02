import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Graph({ data }) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <Line type="monotone" dataKey="price" stroke="#D7B257" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}

