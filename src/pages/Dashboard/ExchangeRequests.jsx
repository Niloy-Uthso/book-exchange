import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Check, X, User, Mail, BookOpenCheck } from "lucide-react";

const ExchangeRequests = () => {
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetchMyBooks();
    }
  }, [user]);

  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/allbooks?email=${user.email}`);
      setMyBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setMessage("❌ Failed to load your books");
    } finally {
      setLoading(false);
    }
  };

  // Filter books that have requests
  const booksWithRequests = myBooks.filter(
    book => book.requestedby && book.requestedby.length > 0
  );

  const handleApproveRequest = async (bookId, requesterEmail, event) => {
    try {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      setMessage("");
      
      // Update the UI instantly - only change status and currenthand
      setMyBooks(prevBooks => 
        prevBooks.map(book => 
          book._id === bookId 
            ? { 
                ...book, 
                status: "exchanged",
                currenthand: requesterEmail
                // Keep all requestedby data - don't remove anyone
              }
            : book
        )
      );

      // Then make the API call
      await axios.patch(`http://localhost:5000/allbooks/${bookId}`, {
        $set: { 
          status: "exchanged",
          currenthand: requesterEmail
        }
        // Don't pull from requestedby - keep all requests
      });

      setMessage(`✅ Request approved! Book given to ${requesterEmail}`);
      
    } catch (error) {
      console.error("Error approving request:", error);
      setMessage("❌ Failed to approve request");
      // Revert UI changes if API call fails
      fetchMyBooks();
    }
  };

  const handleRejectRequest = async (bookId, requesterEmail, event) => {
    try {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      setMessage("");
      
      // Update UI instantly - remove only the rejected requester
      setMyBooks(prevBooks => 
        prevBooks.map(book => 
          book._id === bookId 
            ? { 
                ...book, 
                requestedby: book.requestedby.filter(req => req.email !== requesterEmail)
              }
            : book
        )
      );

      await axios.patch(`http://localhost:5000/allbooks/${bookId}`, {
        $pull: { requestedby: { email: requesterEmail } }
      });

      setMessage(`❌ Request from ${requesterEmail} rejected`);
      
    } catch (error) {
      console.error("Error rejecting request:", error);
      setMessage("❌ Failed to reject request");
      // Revert UI changes if API call fails
      fetchMyBooks();
    }
  };

  // Render buttons based on book status
  const renderActionButtons = (book, requester) => {
    if (book.status === "exchanged") {
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm">
          <BookOpenCheck size={16} />
          Book Exchanged
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={(e) => handleApproveRequest(book._id, requester.email, e)}
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
          title="Approve Exchange"
          type="button"
        >
          <Check size={16} />
          Approve
        </button>
        <button
          onClick={(e) => handleRejectRequest(book._id, requester.email, e)}
          className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
          title="Reject Request"
          type="button"
        >
          <X size={16} />
          Reject
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading exchange requests...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Exchange Requests</h2>
        <p className="text-gray-600">
          Manage book exchange requests from other users
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}>
          {message}
        </div>
      )}

      {/* Books with Requests */}
      {booksWithRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Exchange Requests
          </h3>
          <p className="text-gray-500">
            You don't have any pending exchange requests for your books.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {booksWithRequests.map((book) => (
            <div key={book._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              {/* Book Header */}
              <div className="flex items-center gap-4 p-6 bg-gray-50 border-b">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-16 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{book.name}</h3>
                  <p className="text-gray-600">by {book.writer}</p>
                  <p className="text-sm text-gray-500">Edition: {book.edition}</p>
                  <div className={`inline-flex items-center gap-1 mt-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    book.status === "exchanged" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {book.status === "exchanged" ? (
                      <>
                        <BookOpenCheck size={12} />
                        Exchanged with {book.currenthand}
                      </>
                    ) : (
                      "Available"
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Requests</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {book.requestedby.length}
                  </div>
                </div>
              </div>

              {/* Requesters List - ALWAYS SHOW ALL REQUESTERS */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  {book.status === "exchanged" ? "All Requests" : "People who want to exchange:"}
                </h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {book.requestedby.map((requester, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {/* Requester Info */}
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={requester.photo || "https://i.ibb.co/3m1pM7n/default-avatar.png"}
                          alt={requester.name}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <User size={16} className="text-gray-400" />
                            <p className="font-medium text-gray-800 truncate">
                              {requester.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-400" />
                            <p className="text-sm text-gray-600 truncate">
                              {requester.email}
                            </p>
                          </div>
                          {requester.requestedAt && (
                            <p className="text-xs text-gray-400 mt-1">
                              Requested: {new Date(requester.requestedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {renderActionButtons(book, requester)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {booksWithRequests.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-wrap gap-6 text-sm text-blue-800">
            <div>
              <span className="font-semibold">Total Books with Requests:</span> {booksWithRequests.length}
            </div>
            <div>
              <span className="font-semibold">Total Requests:</span>{" "}
              {booksWithRequests.reduce((total, book) => total + book.requestedby.length, 0)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeRequests;