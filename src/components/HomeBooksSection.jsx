import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
const HomeBooksSection = () => {
  const [books, setBooks] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-exchange-backend-alpha.vercel.app/allbooks");
         
        setBooks(res.data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
         
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Explore Our Latest Books
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <motion.div
             key={book._id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.3, 
      // delay: index * 0.1,
      ease: "easeOut" 
    }}
    whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
    whileTap={{ scale: 0.97 }}
              
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-56 object-cover"
              />

                 <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {book.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{book.writer}</p>
             <div className="flex justify-between items-center">
                <p
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    book.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.status}
                </p>
                 <p  onClick={() => navigate(`/book/${book._id}`)} className="inline-block border cursor-pointer hover:bg-yellow-200 transition px-2 py-1 rounded-full text-xs font- bg-blue-100 text-yellow-700 mr-2">Details</p>
               </div>
              </div>


             
          
            
            </motion.div>
          ))}
        </div>

        
       <div className="flex justify-center mt-10">
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to="/allbooks"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition block"
    >
      See All Books
    </Link>
  </motion.div>
</div>
      </div>
    </section>
  );
};

export default HomeBooksSection;
