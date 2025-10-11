import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // assuming you already have this
import { Link } from "react-router";
import { Pencil, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetchMyBooks();
    }
  }, [user]);

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get(
        `https://book-exchange-backend-alpha.vercel.app/allbooks?email=${user.email}`
      );
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    

    try {
       const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

      await axios.delete(`https://book-exchange-backend-alpha.vercel.app/allbooks/${id}?email=${user.email}`);
         Swal.fire(
      'Deleted!',
      'Your book has been deleted.',
      'success'
    );
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      ("eror", error)
       Swal.fire(
      'Error!',
      'Failed to delete the book.',
      'error'
    );
    }
  };

  // Filter books by search input (name or writer)
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.writer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">My Books</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by book or writer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Book Cards */}
      {filteredBooks.length === 0 ? (
        <p className="text-gray-600">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.name}
                </h3>
                <p className="text-gray-500 mb-1">by {book.writer}</p>
                <p className="text-sm text-gray-400 mb-3">
                  Edition: {book.edition}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/dashboard/edit-book/${book._id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Pencil size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                  <Link
                    to={`/book/${book._id}`}
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
                  >
                    <Eye size={16} /> Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
