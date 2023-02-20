import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserPage from "./userPage";
import api from "../api/index";

const UsersList = () => {
   const { userId } = useParams();
   const [user, setUser] = useState();
   const history = useHistory();
   useEffect(() => {
      api.users.getById().then((data) => {
         setUser(data);
      });
   });

   const handleClick = () => {
      history.push(`${"/users" + userId}`);
   };

   if (user) {
      return <h2>Loading...</h2>;
   }

   return <UserPage user={api.users} handleClick={handleClick} />;
};

export default UsersList;
