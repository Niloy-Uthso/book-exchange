import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Search, Eye } from "lucide-react";
import { motion } from "framer-motion";
const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://book-exchange-backend-alpha.vercel.app/allbooks");
      setBooks(res.data);
      setError("");
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

   
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.writer.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">All Books</h2>
        <p className="text-gray-600">Discover books from our community</p>
      </div>

       
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by book name or writer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
        </p>
      </div>

      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            {search ? "No books match your search." : "No books available yet."}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book,index) => (
          <motion.div
    key={book._id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      ease: "easeOut" 
    }}
    whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
    whileTap={{ scale: 0.97 }}
    className="bg-white rounded-lg p-4"
  >
           {/* Book content */}
           <div
              key={book._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
               
              <div className="relative h-48 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
                 
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
                  book.status === "available" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {book.status}
                </div>
              </div>

              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {book.name}
                </h3>
                <p className="text-gray-600 mb-2">by {book.writer}</p>
                <p className="text-sm text-gray-500 mb-3">Edition: {book.edition}</p>
                
                
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-500">
                    Owner: {book.owneremail}
                  </p>
                </div>

               
                <div className="mt-4">
                  <Link
                    to={`/book/${book._id}`}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;