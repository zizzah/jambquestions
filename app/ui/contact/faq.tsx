import { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleOpen = (id: number) => () => setOpenFAQ(openFAQ === id ? null : id);

  const faqs = [
    {
      id: 1,
      question: "How quickly will I get a response?",
      answer: "We typically respond to support tickets within 24 hours during business days. For urgent issues, we aim to respond within 2-4 hours."
    },
    {
      id: 2,
      question: "What information should I include in my message?",
      answer: "Please include your account email, a detailed description of the issue, any error messages you're seeing, and steps you've already tried to resolve the problem."
    },
    {
      id: 3,
      question: "Can I attach files to my support request?",
      answer: "Yes, you can attach screenshots or documents that help explain your issue. This often helps us resolve problems faster."
    },
    {
      id: 4,
      question: "Is phone support available?",
      answer: "Currently, we offer support via email, live chat, and WhatsApp. Phone support is available for premium subscribers by appointment."
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={toggleOpen(faq.id)}
              className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all flex items-center justify-between"
            >
              <span className="font-medium">{faq.question}</span>
              <span className={`transform transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>
            {openFAQ === faq.id && (
              <div className="px-6 pb-4 text-gray-300 border-t border-white/10">
                <div className="pt-4">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default FAQSection