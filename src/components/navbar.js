import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiArtificialHive } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold">
          SkillSwap AI
        </h1>

        <div className="flex gap-8 text-lg">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <MdDashboard />
            Dashboard
          </Link>

          <Link
            to="/matches"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <GiArtificialHive />
            Matches
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <FaUserCircle />
            Profile
          </Link>
          <Link
  to="/requests"
  className="flex items-center gap-2 hover:text-yellow-300"
>
  <FaUserFriends />
  Requests
</Link>
<Link
  to="/connections"
  className="flex items-center gap-2 hover:text-yellow-300"
>
  <FaUsers />
  Connections
</Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="flex items-center gap-2 hover:text-red-300"
          >
            <FiLogOut />
            Logout
          </button>
          

        </div>

      </div>
    </nav>
  );
}

export default Navbar;