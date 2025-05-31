import Link from "next/link";
import { Option } from "@/app/lid/data";


export default function Header({option}:{ option: Option }) {
  return (
       <header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link href='/'>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="text-xl font-bold">JAMBPrep</span>
            </div>
</Link>

            <Link href={option.src}>
            <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
            {option.item}
            </button>
            </Link>
          </nav>
        </header>
  );
}
