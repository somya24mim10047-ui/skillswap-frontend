import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login";
import Dashboard from "./Dashboard";
import Matches from "./Matches";
import Register from "./Register";
import Profile from "./Profile";
import ConnectionRequests from "./ConnectionRequests";
import Connections from "./Connections";
import Chat from "./Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        
        <Route path="/profile" element={<Profile />} />


        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* AI Matches */}
        <Route path="/matches" element={<Matches />} />



        <Route
  path="/requests"
  element={<ConnectionRequests />}
/>
<Route
  path="/connections"
  element={<Connections />}
/>
<Route path="/chat/:username" element={<Chat />} />        

      </Routes>
    </BrowserRouter>
  );
}

export default App;