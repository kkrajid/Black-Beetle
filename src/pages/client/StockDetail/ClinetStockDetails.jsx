import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { StockDashboard, StockDetails } from '../../../components/features/client/ClientComponents'
import { NavbarSecond } from '../StockDashbord/NavbarSecond';

const ClientStockDetails = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        navigate('/login');
      }
    }, [navigate]);

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
