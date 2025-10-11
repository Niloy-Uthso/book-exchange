import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const EditBookDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`https://book-exchange-backend-alpha.vercel.app/allbooks/${id}`);
      if (res.data.owneremail !== user.email) {
        toast.error("Access denied! You can only edit your own books.");
        return navigate("/dashboard/my-books");
      }
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching book:", err);
      toast.error("Failed to load book details.");
      navigate("/dashboard/my-books");
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://book-exchange-backend-alpha.vercel.app/allbooks-edit/${id}?email=${user.email}`, {
        $set: {
          name: book.name,
          writer: book.writer,
          edition: book.edition,
          image: book.image,
          status: book.status,
        },
      });
      toast.success("Book updated successfully!");
      navigate("/dashboard/my-books");
    } catch (err) {
      console.error("Error updating book:", err);
      toast.error("Failed to update book.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Book Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={book.name || ""}
          onChange={handleChange}
          placeholder="Book Name"
          className="w-full p-3 border rounded-md"
        />
        <input
          name="writer"
          value={book.writer || ""}
          onChange={handleChange}
          placeholder="Writer"
          className="w-full p-3 border rounded-md"
        />
        <input
          name="edition"
          value={book.edition || ""}
          onChange={handleChange}
          placeholder="Edition"
          className="w-full p-3 border rounded-md"
        />
        <input
          name="image"
          value={book.image || ""}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded-md"
        />
        <select
          name="status"
          value={book.status || "available"}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
          <option value="exchanged">Exchanged</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBookDetail;
