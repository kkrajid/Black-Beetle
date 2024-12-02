import React from 'react';

import { StockDashboard, StockDetails } from '../../../components/features/client/ClientComponents'
import { NavbarSecond } from '../StockDashbord/NavbarSecond';


const ClientStockDetails = () => {
    return (
        <div 
        // style={{ 
        //     backgroundImage: `url("data:image/svg+xml;base64,${btoa(Curve)}")`,
        //     // backgroundSize: 'cover',
        //     // backgroundPosition: 'center'
        // }}
        className='flex flex-col w-full min-h-screen '>
            {/* <NavbarSecond /> */}
            <NavbarSecond/>
            <main className='flex-grow mt-24'>
                <StockDetails/>
            </main>
        </div>
    );
}

export default ClientStockDetails;
