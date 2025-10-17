import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Fade, Zoom } from "react-awesome-reveal";
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center  mx-4 rounded-2xl my-8 text-white">
      <div className="container mx-auto px-6">
        <motion.h2
             animate={{ 
    opacity: [1, 0.2, 1],
    scale: [1, 1.02, 1]
  }}
  transition={{ 
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
        className="text-4xl font-bold mb-4">
          Join Our Book Exchange Community Today!
        </motion.h2>
       <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
  <Typewriter
    words={[
      'Discover, share, and exchange books with fellow readers. Don\'t miss out — create your free account now and start your book journey!'
    ]}
    loop={0}
    cursor
    cursorStyle="_"
    typeSpeed={59}
    deleteSpeed={50}
    cursorBlinking={true}
  />
</p>

        <div className="flex justify-center gap-4">
          <motion.div 
           animate={{ 
    opacity: [1, 0.2, 1],
    scale: [1, 1.02, 1]
  }}
  transition={{ 
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  //  style={{ transformOrigin: "center center" }}
>
          <Zoom>
             
 
          <Link
            to="/register"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
          >
            Register Now <ArrowRight size={18} />
          </Link>
          
          </Zoom>
          </motion.div>
                

         <motion.div
  animate={{ 
    opacity: [1, 0.2, 1],
    scale: [1, 1.02, 1]
  }}
  transition={{ 
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="my-2.5"
>
  <Link
    to="/login"
    className="border border-white px-6 py-3 rounded-lg  font-semibold hover:bg-white hover:text-blue-700 transition"
  >
    Already a Member?
  </Link>
</motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
