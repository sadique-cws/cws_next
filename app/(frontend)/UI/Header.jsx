import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Programming Coaching </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/courses" className="hover:text-gray-300">Courses </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">About </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">Contact </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
