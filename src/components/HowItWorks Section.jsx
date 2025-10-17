import { BookOpen, Handshake, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
      title: "Browse Books",
      desc: "Explore a wide collection of books shared by readers across the community.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-blue-600" />,
      title: "Request or Borrow",
      desc: "Request a book you love or borrow it directly from another user with a single click.",
    },
    {
      icon: <RefreshCcw className="w-10 h-10 text-blue-600" />,
      title: "Exchange or Return",
      desc: "After reading, easily return or exchange your book to keep the cycle going.",
    },
  ];

   
  const colors = ["#f9fafb", "#fef08a", "#bbf7d0"];  

  
  const [colorIndexes, setColorIndexes] = useState([0, 1, 2]);

   
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndexes((prev) =>
        prev.map(() => Math.floor(Math.random() * colors.length))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Share, borrow, and exchange books effortlessly. Here's how our
          platform makes it simple and fun!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              animate={{
                backgroundColor: colors[colorIndexes[index]],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className="p-8 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
