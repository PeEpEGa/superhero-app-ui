import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="h-[80px] relative flex justify-between px-6 py-4 bg-[#212121] text-white">
      {/* logo */}
      <Link to="/" className="relative flex items-center gap-2">
        {/* <Image
          src="/logo.png"
          alt="logo"
          width={24}
          height={24}
          //   fill
          style={{ objectFit: "contain", height: "auto" }}
        /> */}
        <span className="text-xl font-extralight">Superhero App</span>
      </Link>

      {/* navigation */}
      <nav className="flex items-center gap-4">
        <Link className="font-semibold" to="/">
          All Superheroes
        </Link>
        <Link to="/superheroes/create">Add</Link>
        <Link className="font-semibold" to="/superheroes">
          Edit
        </Link>
      </nav>
    </header>
  );
}
