
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="container mx-auto px-6 py-4 flex justify-between items-center">
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <Link href="/">
              <span className="text-xl font-bold">JAMBPrep</span>
            </Link>
          </div>
          {children}
        </nav>
      </header>
    </header>
  );
}
