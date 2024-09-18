import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between ">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link className="hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <Link href="https://github.com/jamisonrobey">
        <FaGithub className="w-8 h-8" />
      </Link>
    </header>
  );
}
