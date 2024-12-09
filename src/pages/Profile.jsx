import React from "react";
import UserDetails from "../components/UserDetails";
import WatchList from "../components/WatchList";

const Profile = () => {
  return (
    <div className="flex">
      <UserDetails />
      <WatchList />
    </div>
  );
};

export default Profile;
