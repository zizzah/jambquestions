'use client';

import ContactForm from "../ui/contact/contactForm";
import ContactMethodCard from "../ui/contact/contactMathodCard";
import FAQSection from "../ui/contact/faq";
import Header from "../ui/header";
import HeroSection from "../ui/contact/hero"

// Header Component
const Contact = () => {
  /**
   * Redirects to WhatsApp if the user clicks on the button.
   * @param {React.MouseEvent<HTMLButtonElement>} e - The click event.
   */
  const handleContact = () =>{
    if (typeof window !== "undefined") {
      window.location.href = "https://wa.me/+2348166999441";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <Header>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition duration-150">
            Back to Dashboard
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-none transition duration-150">
            Live Chat
          </button>
        </div>
      </Header>
     <HeroSection />

      <ContactMethodCard
        method={{
          icon: "", // TODO: Add appropriate icon (e.g., a phone SVG or emoji)
          method: "Phone",
          value: "+2348166999441",
          description: "Call us on whatsapp for immediate support.",
          availability: "24/7",
        }}
        onClick={handleContact}
      />
      <ContactForm />

      <FAQSection />
    </div>
  );
};

export default Contact;
