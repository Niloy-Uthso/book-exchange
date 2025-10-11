import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Rahman",
      photo: "https://i.ibb.co.com/N2SgcG47/indian-woman-happy-relax-portrait-sofa-lounge-comfortable-pride-weekend-home-female-person-smile-cou.jpg",
      feedback:
        "This platform has completely changed how I share books! I’ve discovered amazing reads and met fellow book lovers.",
      role: "Literature Student",
    },
    {
      name: "Rafiul Hasan",
      photo: "https://i.ibb.co.com/SXyctPzW/pexels-photo-2379005.jpg",
      feedback:
        "Borrowing and exchanging books has never been easier. The community here is super helpful and kind!",
      role: "Software Engineer",
    },
    {
      name: "Tania Sultana",
      photo: "https://i.ibb.co.com/C5dfY2dg/beautiful-girl-stands-park-8353-5084.jpg",
      feedback:
        "I love the simplicity! It’s a great way to make use of old books and explore new genres at zero cost.",
      role: "Book Enthusiast",
    },
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
         
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Our Readers Say
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our community of readers and exchangers share their experiences below.
        </p>

         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
            >
              <Quote className="text-blue-500 w-8 h-8 mb-4 mx-auto" />
              <p className="text-gray-700 italic mb-6">“{t.feedback}”</p>

              <div className="flex flex-col items-center">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-blue-500"
                />
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
