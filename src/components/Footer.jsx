import { useState } from "react";
import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Mail, BookOpen, X } from "lucide-react";

const Footer = () => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (type) => setOpenModal(type);
  const handleCloseModal = () => setOpenModal(null);

  const modalContent = {
    faq: {
      title: "Frequently Asked Questions",
      text: `
1. How does BookSwap work?  
   ➤ Users can list their books, send exchange requests, and borrow others’ books.  

2. Is it free to use?  
   ➤ Yes! Our platform is completely free for readers and book lovers.  

3. How can I return a book?  
   ➤ You can go to your dashboard → Borrowed Books → click "Return".  
      That’s it!`,
    },
    privacy: {
      title: "Privacy Policy",
      text: `
We respect your privacy.  
- Your data (email, profile, and book details) are only used to facilitate exchanges.  
- We do not sell or share user data with third parties.  
- You can request data deletion at any time by contacting support@bookswap.com.`,
    },
    terms: {
      title: "Terms of Service",
      text: `
By using BookSwap, you agree to:  
- Share accurate information about your books.  
- Return borrowed books in the same condition.  
- Respect community guidelines.  
Violation of these terms may result in account suspension.`,
    },
  };

  const renderModal = () => {
    if (!openModal) return null;
    const { title, text } = modalContent[openModal];
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 mt-20">
        <div className="bg-yellow-400 text-black rounded-lg shadow-2xl max-w-lg w-full mx-4 p-6 relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-3 right-3 text-black hover:text-red-700"
          >
            <X size={22} />
          </button>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="whitespace-pre-line text-gray-900 leading-relaxed text-sm">
            {text}
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
         
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={28} className="text-blue-500" />
            <h3 className="text-xl font-bold text-white">BookSwap</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Share your love for reading. Exchange, borrow, and discover amazing
            books with people across the community.
          </p>
        </div>

       
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/allbooks" className="hover:text-blue-400 transition">All Books</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleOpenModal("faq")}
                className="hover:text-blue-400 transition"
              >
                FAQs
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpenModal("privacy")}
                className="hover:text-blue-400 transition"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpenModal("terms")}
                className="hover:text-blue-400 transition"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

         
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Get in Touch</h4>
          <p className="text-sm mb-3 flex items-center gap-2">
            <Mail size={16} className="text-blue-400" />
            support@bookswap.com
          </p>

          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

    
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-semibold">BookSwap</span>. All rights reserved.
      </div>

      {renderModal()}
    </footer>
  );
};

export default Footer;
