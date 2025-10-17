import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import emailjs from '@emailjs/browser';
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");  
  const [sendingEmail, setSendingEmail] = useState(false);

   
  useEffect(() => {
    emailjs.init("Iiyjrmb-ueGucPDl9");
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://book-exchange-backend-alpha.vercel.app/allbooks/${id}`);
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
    
     
    const requesterData = {
      name: user.displayName || user.email,
      email: user.email,
      photo: user.photoURL || "https://i.ibb.co/3m1pM7n/default-avatar.png",
      requestedAt: new Date().toISOString()
    };

    
    await axios.patch(`https://book-exchange-backend-alpha.vercel.app/allbooks/${book._id}`, {
      $push: { requestedby: requesterData }
    });

    setMessage(`📩 Request sent to ${book.owneremail}`);
    Swal.fire({
  icon: 'success',
  title: 'Request Sent!',
  text: `Your book request has been sent to ${book.owneremail}`,
  confirmButtonColor: '#10b981', // green-500
});
  } catch (error) {
    console.error("Request failed:", error);
    
    
    if (error.response?.data?.error === "You have already requested this book") {
      setMessage("❌ You have already requested this book");
    } else {
      setMessage("❌ Failed to send request.");
    }
  }
};

   
  const handleSendMessage = async () => {
    try {
      setSendingEmail(true);
      setMessage("");

      if (!emailMessage.trim()) {
        setMessage("❌ Please write a message");
        return;
      }

      const templateParams = {
        to_email: book.owneremail,
        to_name: book.owneremail.split('@')[0],
        from_name: user.displayName || user.email,
        from_email: user.email,
        book_name: book.name,
        book_writer: book.writer,
        book_edition: book.edition,
        message: emailMessage,
        request_date: new Date().toLocaleDateString(),
        app_url: "https://book-exchange-dd208.web.app/"
      };

      await emailjs.send(
        'service_6cx4t9t',
        'template_8ilb37n',
        templateParams
      );

      setMessage("✅ Message sent to book owner successfully!");
      setEmailMessage("");
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage("❌ Failed to send message.");
    } finally {
      setSendingEmail(false);
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
          {/* <p className="text-gray-700 mb-3"><span className="font-medium">Owner Email:</span> {book.owneremail}</p> */}
          {
            (user?.email === book?.owneremail) &&  <p className="text-gray-700 mb-3"><span className="font-medium">Current Hand:</span> {book?.currenthand  || "N/A"}</p>
          }
   {
    (user?.email === book?.owneremail) ? <p className="text-gray-700 mb-3"><span className="font-medium">Owner Email:</span>  Your Book</p> : <p className="text-gray-700 mb-3"><span className="font-medium">Owner Email:</span> {book.owneremail}</p>
   }
         
          <div className="mt-4">
            <button
              onClick={handleRequestBook}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Request This Book
            </button>
          </div>

          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Send Message to Owner</h3>
            <textarea
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder="Write a message to send to the book owner..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
            <button
              onClick={handleSendMessage}
              disabled={sendingEmail || !emailMessage.trim()}
              className="mt-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              {sendingEmail ? "Sending..." : "Send Message"}
            </button>
          </div>

          {message && (
            <p className={`mt-3 font-medium ${
              message.includes("❌") ? "text-red-600" : "text-green-600"
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;