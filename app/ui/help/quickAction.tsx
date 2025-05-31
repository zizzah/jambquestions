import { quickActions } from "@/app/lid/data"
import Link from "next/link"
const QuickAction  = () => {
  return (
             <div className="mb-12">
               <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {quickActions.map((action, index) => (
                    <Link href={action.href} key={index} >
                   <div
                     key={index}
                     className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer group"
                   >
                     <div className="text-center">
                       <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
                       <h3 className="font-semibold mb-2">{action.title}</h3>
                       <p className="text-sm text-gray-300">{action.description}</p>
                     </div>
                   </div>
                   </Link>
                 ))}
               </div>
             </div>
 
 
  )
}

export default QuickAction 
