import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

const Stats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    ownedBooks: 0,
    borrowedBooks: 0,
    exchangeRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
         
        const { data: allBooks } = await axios.get(
          "https://book-exchange-backend-alpha.vercel.app/allbooks-state"
        );

         
        const ownedBooks = allBooks.filter(
          (book) => book.owneremail === user?.email
        );

       
        const exchangeRequests = allBooks.filter(
          (book) => Array.isArray(book.requestedby) && book.requestedby.length > 0
        );

         
        const { data: userData } = await axios.get(
          `https://book-exchange-backend-alpha.vercel.app/users/${user?.email}`
        );

        setStats({
          totalBooks: allBooks.length,
          ownedBooks: ownedBooks.length,
          borrowedBooks: userData?.borrowedbookid?.length || 0,
          exchangeRequests: exchangeRequests.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    if (user?.email) fetchStats();
  }, [user]);

  const chartData = [
    { name: "Total Books", value: stats.totalBooks },
    { name: "Your Books", value: stats.ownedBooks },
    { name: "Borrowed Books", value: stats.borrowedBooks },
    { name: "Exchange Requests", value: stats.exchangeRequests },
  ];

  return (
    <motion.div
    animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="bg-white shadow-md rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        📊 Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
        <div className="w-full h-64 ">
          <ResponsiveContainer
           
          >
            <PieChart
             
            >
              <Pie
             
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="55%"
                outerRadius={80}
               label 
  
    fill="#8884d8"
    isAnimationActive={true}
    animationBegin={0}
    animationDuration={1200}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

       
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-blue-100 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-blue-700">Total Books</h3>
            <p className="text-2xl font-bold">{stats.totalBooks}</p>
          </div>

          <div className="p-4 bg-green-100 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-green-700">Your Books</h3>
            <p className="text-2xl font-bold">{stats.ownedBooks}</p>
          </div>

          <div className="p-4 bg-yellow-100 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-yellow-700">Borrowed</h3>
            <p className="text-2xl font-bold">{stats.borrowedBooks}</p>
          </div>

          <div className="p-4 bg-pink-100 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-pink-700">Requests</h3>
            <p className="text-2xl font-bold">{stats.exchangeRequests}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
