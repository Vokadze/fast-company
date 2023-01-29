import React from "react";
import User from "./user";

const Users = ({ users, user, ...rest }) => {

   return <User
      user={user}
      {...rest}
   />
}

export default Users
