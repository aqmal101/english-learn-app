import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="w-fit fixed left-6 top-6 p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </>
  );
};

export default Navbar;
