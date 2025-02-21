import React, { useState, useEffect } from "react";

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("personalInformation");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState(["BlockedUser1", "BlockedUser2"]);
  const [accountDeleted, setAccountDeleted] = useState(false);

  // Simulate fetching user data from a server
  useEffect(() => {
    setTimeout(() => {
      setUserData([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
      ]);
    }, 1000);
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSavePersonalInfo = () => alert("Personal information updated!");

  const handleDeleteAccount = () => {
    setAccountDeleted(true);
    alert("Your account has been deleted!");
  };

  const options = {
    personalInformation: (
      <div>
        <h2>Update Personal Information</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button onClick={handleSavePersonalInfo}>Save Changes</button>
      </div>
    ),
    data: (
      <div>
        <h2>Your Data</h2>
        {userData ? (
          <ul>
            {userData.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    ),
    privacy: (
      <div>
        <h2>Blocked Users</h2>
        {blockedUsers.length > 0 ? (
          <ul>
            {blockedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        ) : (
          <p>No blocked users</p>
        )}
      </div>
    ),
    delete: (
      <div>
        <h2>Account Deactivation</h2>
        {accountDeleted ? (
          <p>Your account has been deleted.</p>
        ) : (
          <>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </>
        )}
      </div>
    ),
  };

  const optionList = [
    { key: "personalInformation", label: "Personal Information" },
    { key: "data", label: "Your Data" },
    { key: "privacy", label: "Your Privacy" },
    { key: "delete", label: "Deactivation" },
  ];

  return (
    <div className="settings">
      <div className="options_list">
        {optionList.map((option) => (
          <div
            key={option.key}
            className={`option ${selectedOption === option.key ? "active" : ""}`}
            onClick={() => setSelectedOption(option.key)}
          >
            {option.label}
          </div>
        ))}
      </div>
      <div className="options_container">{options[selectedOption]}</div>
    </div>
  );
};

export default Settings;