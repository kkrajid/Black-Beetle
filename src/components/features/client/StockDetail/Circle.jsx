import React from 'react';

export default function Circle({ radius, color }) {
    return (
        <div
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                borderRadius: '50%',
                backgroundColor: color,
            }}
        />
    );
}

