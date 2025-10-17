import { Quote } from "lucide-react";
import { Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Rahman",
      photo: "https://i.ibb.co.com/N2SgcG47/indian-woman-happy-relax-portrait-sofa-lounge-comfortable-pride-weekend-home-female-person-smile-cou.jpg",
      feedback: "This platform has completely changed how I share books! I've discovered amazing reads and met fellow book lovers.",
      role: "Literature Student",
    },
    {
      name: "Rafiul Hasan",
      photo: "https://i.ibb.co.com/SXyctPzW/pexels-photo-2379005.jpg",
      feedback: "Borrowing and exchanging books has never been easier. The community here is super helpful and kind!",
      role: "Software Engineer",
    },
    {
      name: "Tania Sultana",
      photo: "https://i.ibb.co.com/C5dfY2dg/beautiful-girl-stands-park-8353-5084.jpg",
      feedback: "I love the simplicity! It's a great way to make use of old books and explore new genres at zero cost.",
      role: "Book Enthusiast",
    },
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <Slide direction="left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Readers Say
          </h2>
        </Slide>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our community of readers and exchangers share their experiences below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
  key={i}
  whileHover={{ 
    scale: 1.05,
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    opacity: [1, 0.8, 1] // Blinking effect
  }}
  transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 20,
    opacity: {
      duration: 0.5,
      repeat: 2, // Blinks twice on hover
      ease: "easeInOut"
    }
  }}
  className="bg-white p-8 rounded-2xl shadow-sm cursor-pointer"
>
              <Quote className="text-blue-500 w-8 h-8 mb-4 mx-auto" />
              
              {/* Typing animation for feedback */}
              <div className="text-gray-700 italic mb-6 min-h-[120px] flex items-center">
                <Typewriter
                  words={[t.feedback]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={30}
                  deleteSpeed={50}
                  delaySpeed={1000 * (i + 1)} // Staggered start
                />
              </div>

              <div className="flex flex-col items-center">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={t.photo}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-blue-500"
                />
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;