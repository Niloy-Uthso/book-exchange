import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">
          Join Our Book Exchange Community Today!
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Discover, share, and exchange books with fellow readers.  
          Don’t miss out — create your free account now and start your book journey!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
          >
            Register Now <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Already a Member?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
