import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import {
  getRequests,
  acceptRequest,
  rejectRequest,
} from "./api";

function ConnectionRequests() {
  const [requests, setRequests] = useState([]);

 const loadRequests = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    const res = await getRequests(token);

    console.log("Requests Response:", res.data);

    setRequests(res.data);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (id) => {
    const token = localStorage.getItem("token");

    await acceptRequest(token, id);

    alert("Connection Accepted");

    loadRequests();
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("token");

    await rejectRequest(token, id);

    alert("Connection Rejected");

    loadRequests();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold mb-8 text-blue-700">
          Connection Requests
        </h1>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-xl">
              No Pending Requests
            </h2>
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white shadow-lg rounded-xl p-6 mb-5"
            >
              <h2 className="text-2xl font-bold">
    {req.username}
</h2>

              <p className="text-gray-500">
                wants to connect with you.
              </p>

              <div className="mt-5 flex gap-4">

                <button
                  onClick={() => handleAccept(req.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(req.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </>
  );
}

export default ConnectionRequests;