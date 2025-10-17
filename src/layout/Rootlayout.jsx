import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
const Rootlayout = () => {
    const location = useLocation();
    return (
        <div>
            <Navbar></Navbar>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="mb-20">  
  <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
</div>
            <Footer></Footer>
        </div>
    );
};

export default Rootlayout;