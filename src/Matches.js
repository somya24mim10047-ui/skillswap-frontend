import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { getMatches, sendConnectionRequest } from "./api";
import { FaUserCircle } from "react-icons/fa";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  console.log("Token from localStorage:", token);

  getMatches(token)
    .then((res) => {
      console.log("Response:", res.data);
      setMatches(res.data);
    })
    .catch((err) => {
      console.log("Status:", err.response?.status);
      console.log("Error Data:", err.response?.data);
      console.log("Request Headers:", err.config?.headers);
    });
}, []);
const handleConnect = async (username) => {
  try {
    const token = localStorage.getItem("token");

    const res = await sendConnectionRequest(token, username);

    alert(res.data.message);

    setSentRequests([...sentRequests, username]);

  } catch (err) {
    if (err.response) {
      alert(err.response.data.error);
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          AI Skill Matches
        </h1>

        {matches.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold">
              No matches found
            </h2>

            <p className="text-gray-500 mt-2">
              Add more skills to improve AI recommendations.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {matches.map((match, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
              >

                <div className="flex items-center gap-4">

                  <FaUserCircle
                    className="text-blue-500"
                    size={60}
                  />

                  <div>
                    <h2 className="text-2xl font-bold">
                      {match.username}
                    </h2>

                    <p className="text-gray-500">
                      AI Recommended
                    </p>
                  </div>

                </div>

                <hr className="my-5" />

                <h3 className="font-semibold mb-3">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {match.skills.map((skill, i) => (

                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {skill.name}
                    </span>

                  ))}

                </div>

                <div className="mt-6">

                  <p className="font-semibold mb-2">
                    Match Score
                  </p>

                  <div className="w-full bg-gray-300 rounded-full h-4">

                    <div
                      className="bg-green-500 h-4 rounded-full"
                      style={{
                        width: `${match.similarity}%`
                      }}
                    ></div>

                  </div>

                  <p className="mt-2 font-bold text-green-700">
                    {match.similarity}%
                  </p>

                </div>

                <button
  onClick={() => handleConnect(match.username)}
  disabled={sentRequests.includes(match.username)}
  className={`mt-6 w-full py-2 rounded-lg transition ${
    sentRequests.includes(match.username)
      ? "bg-green-600"
      : "bg-purple-600 hover:bg-purple-700"
  } text-white`}
>
  {sentRequests.includes(match.username)
    ? "Request Sent"
    : "Connect"}
</button>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Matches;