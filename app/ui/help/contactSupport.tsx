import Link from "next/link";

import { contactMethods } from "@/app/lid/data";

export default function ContactSupport() {



  

  return (
    

     <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
                    <p className="text-gray-300">Our support team is here to help you succeed</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactMethods.map((contact, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <div className="text-2xl mb-3">{contact.icon}</div>
                        <h3 className="font-semibold mb-2">{contact.method}</h3>
                        <p className="text-yellow-400 font-medium mb-2">{contact.value}</p>
                        <p className="text-sm text-gray-300">{contact.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Link href='/contact' >
                    <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300">
                      Contact Support Team
                    </button>
                    </Link>
                  </div>
                </div>
  );
}
