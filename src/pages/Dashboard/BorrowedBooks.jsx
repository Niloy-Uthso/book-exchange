import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
const {user} = useAuth()
  // ✅ Fetch borrowed books for the logged-in user
  const fetchBorrowedBooks = async () => {
    ("sjkdkshdfkjj")
    try {
      setLoading(true);
      const res = await axios.get(
        `https://book-exchange-backend-alpha.vercel.app/users/${user.email}/borrowed-books`
      );
      ("📚 Backend response:", res.data);
      setBorrowedBooks(res.data);
    } catch (err) {
      console.error("Error fetching borrowed books:", err);
      toast.error("Failed to load borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Return a borrowed book
  const handleReturnBook = async (bookId) => {
    try {
      await axios.patch(
        `https://book-exchange-backend-alpha.vercel.app/users/${user.email}/return-book`,
        { bookId }
      );
      toast.success("Book returned successfully!");
      fetchBorrowedBooks(); 
    } catch (err) {
      console.error("Error returning book:", err);
      toast.error("Failed to return book.");
    }
  };

  useEffect(() => {
    ("👤 Current user:", user);
    if (user?.email) {
      ("📧 Email found, fetching books...");
      fetchBorrowedBooks();
    } else {
      ("⚠️ No email found");
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p className="text-center py-6">Loading borrowed books...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📚 Borrowed Books</h2>

      {borrowedBooks.length === 0 ? (
        <p className="text-gray-500">You haven't borrowed any books yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {borrowedBooks.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <img
                  src={book.image || "https://i.ibb.co/3m1pM7n/default-book.png"}
                  alt={book.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-medium">{book.name}</h3>
                <p className="text-sm text-gray-600">Author: {book.writer}</p>
                <p className="text-sm text-gray-600">Edition: {book.edition}</p>
                <p className="text-sm text-gray-600">
                  Owner: {book.owneremail}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Status:{" "}
                  <span className={`font-medium ${
                    book.status === 'available' ? 'text-green-600' : 
                    'text-blue-600'
                  }`}>
                    {book.status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleReturnBook(book._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;