import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { getProfile, updateProfile, addSkill } from "./api";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    getProfile(token)
      .then((res) => {
        setProfile(res.data);
        setBio(res.data.bio || "");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Save Profile
  const handleSaveProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    await updateProfile(token, {
      bio: bio,
    });

    // Fetch the latest profile from the server
    const res = await getProfile(token);

    setProfile(res.data);
    setBio(res.data.bio || "");

    alert("Profile updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update profile");
  }
};

  // Add Skill
  const handleAddSkill = async () => {
    if (!skillName.trim()) {
      alert("Please enter a skill name.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await addSkill(token, {
        name: skillName,
        description: description,
      });

      // Reload profile
      const res = await getProfile(token);
      setProfile(res.data);

      setSkillName("");
      setDescription("");

      alert("Skill added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add skill.");
    }
  };

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

          <div className="flex justify-center">
            <FaUserCircle className="text-8xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-center mt-4">
            {localStorage.getItem("username")}
          </h1>

          <hr className="my-6" />

          {/* Bio */}
          <h2 className="text-xl font-semibold mb-2">Bio</h2>

          <textarea
            className="w-full border rounded-lg p-3"
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            onClick={handleSaveProfile}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Profile
          </button>

          {/* Skills */}
          <h2 className="text-xl font-semibold mt-8 mb-2">Skills</h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <p>No skills added yet.</p>
            )}
          </div>

          {/* Add Skill */}
          <h2 className="text-xl font-semibold mb-4">
            Add New Skill
          </h2>

          <input
            type="text"
            placeholder="Skill Name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
            rows="3"
          />

          <button
            onClick={handleAddSkill}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Add Skill
          </button>

        </div>
      </div>
    </>
  );
}

export default Profile;