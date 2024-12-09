import React from "react";
import UserDetails from "../components/UserDetails";
import WatchList from "../components/WatchList";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <UserDetails />
      <WatchList />
    </div>
  );
};

export default Profile;
