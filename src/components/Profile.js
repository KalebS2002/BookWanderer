import React, { useState } from "react";

const Profile = () => {
  const userId = sessionStorage.getItem("BWUSERID");
  return (
    <>
      <p>this is the PROFILE page</p>
    </>
  );
};

export default Profile;
