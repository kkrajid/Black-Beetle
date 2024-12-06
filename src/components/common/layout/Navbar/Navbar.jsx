import React from 'react';
import * as Navbars from './NavbarComponent'
 


// Combined Navbar Component
export function Navbar() {
  return (
    <>
      <Navbars.DesktopNavbar/>
      <Navbars.MobileNavbar/>
    </>
  );
}

export default Navbar;