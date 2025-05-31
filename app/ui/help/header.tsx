import Link from "next/link";


export default function Header() {
  return (
<header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="text-xl font-bold">JAMBPrep Help</span>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="/dashboard">
              <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                Back to Dashboard
              </button>
              </Link>
               <Link href="/contact">
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all">
                Contact Support
              </button>
              </Link>
            </div>
          </nav>
        </header>  );
}
