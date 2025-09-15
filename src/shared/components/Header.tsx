import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="h-[80px] relative flex justify-between px-6 py-4 bg-[#212121] text-white">
      {/* logo */}
      <Link to="/" className="relative flex items-center gap-2">
        <span className="text-xl font-extralight">Superhero App</span>
      </Link>

      {/* navigation */}
      <nav className="flex items-center gap-4">
        <Link to="/superheroes/create">Add Superhero</Link>
      </nav>
    </header>
  );
}
