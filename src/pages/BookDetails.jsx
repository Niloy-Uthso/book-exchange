import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
 

const BookDetails = () => {
  const { id } = useParams(); // dynamic :id from router 
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/allbooks/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

const handleRequestBook = async () => {
  try {
    setMessage("");
    
    // Create requester data object
    const requesterData = {
      name: user.displayName || user.email, // Use displayName or fallback to email
      email: user.email,
      photo: user.photoURL || "https://i.ibb.co/3m1pM7n/default-avatar.png",
      requestedAt: new Date().toISOString()
    };

    // Update the book in backend - add to requestedby array
    await axios.patch(`http://localhost:5000/allbooks/${book._id}`, {
      $push: { requestedby: requesterData }
    });

    setMessage(`📩 Request sent to ${book.owneremail}`);
    
    // Optional: Refresh book data to get updated requestedby array
    // fetchBookDetails(); 
    
  } catch (error) {
    console.error("Request failed:", error);
    setMessage("❌ Failed to send request.");
  }
};

  if (loading) return <p className="text-center mt-10">Loading book details...</p>;
  if (!book) return <p className="text-center mt-10">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.image}
          alt={book.name}
          className="w-full md:w-1/3 rounded-xl object-cover border"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-2">{book.name}</h2>
          <p className="text-gray-700 mb-1"><span className="font-medium">Writer:</span> {book.writer}</p>
          <p className="text-gray-700 mb-1"><span className="font-medium">Edition:</span> {book.edition}</p>
          <p className="text-gray-700 mb-1"><span className="font-medium">Status:</span> {book.status}</p>
          <p className="text-gray-700 mb-3"><span className="font-medium">Owner Email:</span> {book.owneremail}</p>

          {/* Future section for direct messaging */}
          <div className="mt-4">
            <button
              onClick={handleRequestBook}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Request This Book
            </button>
          </div>

          {message && (
            <p className="mt-3 text-green-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
