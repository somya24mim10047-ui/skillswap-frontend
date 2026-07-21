import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { getConnections } from "./api";
import { FaUserCircle } from "react-icons/fa";

function Connections() {
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    getConnections(token)
      .then((res) => {
        console.log("Connections API Response:", res.data);
        setConnections(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          My Connections
        </h1>

        {connections.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold">
              No Connections Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Send connection requests and wait for them to be accepted.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {connections.map((connection, index) => {

              // Try different possible username fields
              const username =
                connection.username ||
                connection.user?.username ||
                connection.receiver?.username ||
                connection.sender?.username ||
                connection.connected_user ||
                connection.name ||
                "";

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
                >

                  <div className="flex items-center gap-4">

                    <FaUserCircle
                      size={65}
                      className="text-purple-600"
                    />

                    <div>

                      <h2 className="text-2xl font-bold">
                        {username || "Unknown User"}
                      </h2>

                      <p className="text-green-600 font-semibold">
                        Connected
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => {
                      console.log("Navigating to:", username);

                      if (!username) {
                        alert("Username not found. Check console.");
                        return;
                      }

                      navigate(`/chat/${username}`);
                    }}
                    className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Chat
                  </button>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </>
  );
}

export default Connections;