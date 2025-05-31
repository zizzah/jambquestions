import { JSX } from "react";

/**
 * A contact method card component.
 *
 * @param {{ method: { icon: string, method: string, value: string, description: string, availability: string }, onClick: (method: { icon: string, method: string, value: string, description: string, availability: string }) => void }} props
 * @returns {JSX.Element}
 */
const ContactMethodCard = ({ method, onClick }: { method: { icon: string, method: string,
     value: string, description: string, availability: string },
      onClick: (method: { icon: string, method: string, value: string, 
        description: string, availability: string }) => void }): JSX.Element => {
  return (
    <div
      onClick={() => onClick(method)}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all cursor-pointer group transform hover:scale-105"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{method.icon}</div>
      <h3 className="font-bold text-xl mb-2">{method.method}</h3>
      <p className="text-yellow-400 font-medium mb-3 text-lg">{method.value}</p>
      <p className="text-sm text-gray-300 mb-4">{method.description}</p>
      <div className="text-xs text-gray-400">{method.availability}</div>
    </div>
  );
};

export default ContactMethodCard