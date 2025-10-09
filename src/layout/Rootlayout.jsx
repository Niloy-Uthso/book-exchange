import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Rootlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="mb-20"> {/* Add this wrapper with margin-bottom */}
  <Outlet></Outlet>
</div>
            <Footer></Footer>
        </div>
    );
};

export default Rootlayout;