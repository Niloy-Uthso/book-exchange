import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 const { user } = useAuth();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      // simulate current user email (later you'll take it from auth context)
      const userEmail = user?.email ;

      const bookData = {
        name: data.name,
        writer: data.writer,
        edition: data.edition,
        image: data.image,
        owneremail: userEmail,
        status: "available",
        messages: [], 
         requestedby: []
      };

      const res = await axios.post("https://book-exchange-backend-alpha.vercel.app/allbooks", bookData);
      if (res.data.insertedId) {
          Swal.fire({
        title: "Book Added!",
        text: "Your book has been successfully added to the collection.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
        setMessage("✅ Book added successfully!");
        reset();
         
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Book Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter book name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Writer</label>
          <input
            {...register("writer", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter writer name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Edition / Publication Date</label>
          <input
            {...register("edition", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="e.g. 3rd Edition or 2024"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            {...register("image", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Paste image URL"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 font-medium text-green-600">{message}</p>
      )}
    </div>
  );
};

export default AddBook;
