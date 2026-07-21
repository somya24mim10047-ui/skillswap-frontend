import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCode, FaRobot } from "react-icons/fa";
import Navbar from "./components/navbar";
import { getProfile, getSkills } from "./api";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    getProfile(token)
      .then((res) => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });

    getSkills(token)
      .then((res) => setSkills(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Welcome 👋
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-3xl text-blue-600" />
              <h2 className="text-2xl font-semibold">
                Profile
              </h2>
            </div>

            {profile ? (
              <>
                <p>
                  <strong>Username:</strong>{" "}
                  {localStorage.getItem("username")}
                </p>

                <p className="mt-2">
                  <strong>Bio:</strong>{" "}
                  {profile.bio || "No Bio"}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}

          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">
              <FaCode className="text-3xl text-green-600" />
              <h2 className="text-2xl font-semibold">
                My Skills
              </h2>
            </div>

            {skills.length === 0 ? (
              <p>No Skills Added</p>
            ) : (
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="bg-green-100 rounded-lg px-3 py-2"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* AI Match Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">
              <FaRobot className="text-3xl text-purple-600" />
              <h2 className="text-2xl font-semibold">
                AI Matching
              </h2>
            </div>

            <p className="mb-4">
              Find users with similar skills.
            </p>

            <button
              onClick={() => navigate("/matches")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Find AI Matches
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;