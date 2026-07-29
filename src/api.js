import axios from "axios";

const API = axios.create({
  baseURL: "https://skillswap-backend-7wal.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// LOGIN
export const loginUser = (data) => API.post("login/", data);
export const registerUser = (data) =>
  API.post("register/", data);

// PROFILE
export const getProfile = (token) =>
  API.get("profile/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

// SKILLS
export const getSkills = (token) =>
  API.get("skills/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export const addSkill = (token, data) =>
  API.post("skills/", data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

// AI MATCHES
export const getMatches = (token) => {
  console.log("Sending token:", token);

  return API.get("match/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
export const updateProfile = (token, data) =>
  API.put("profile/", data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }); 

export default API;
export const sendConnectionRequest = (token, username) =>
  API.post(
    "connect/",
    { username },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
// GET Incoming Requests
export const getRequests = (token) =>
  API.get("requests/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

// ACCEPT Request
export const acceptRequest = (token, id) =>
  API.post(
    `accept/${id}/`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

// REJECT Request
export const rejectRequest = (token, id) =>
  API.post(
    `reject/${id}/`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
// GET Accepted Connections
export const getConnections = (token) =>
  API.get("connections/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  export const sendMessage = (token, username, content) =>
  API.post(
    "messages/send/",
    {
      username,
      content,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

export const getConversation = (token, username) =>
  API.get(`messages/${username}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
// SEND MESSAGE


// GET CONVERSATION
