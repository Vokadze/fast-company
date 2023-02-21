import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
   const { userId } = useParams();
   const [user, setUsers] = useState();
   const history = useHistory();

   useEffect(() => {
      API.users.getById(userId).then((data) => setUsers(data));
   });

   const handleClick = () => {
      history.push("/users");
   };

   if (user) {
      return (
         <>
            <div key={user._id}>
               <h1>{user.name}</h1>
               <h2 className="pb-3">Профессия: {user.profession.name}</h2>
               <div className="pb-2">
                  <QualitiesList qualities={user.qualities}/>
               </div>
               <p>completedMeetings: {user.completedMeetings}</p>
               <h2 className="pb-2">Rate: {user.rate}</h2>
               <button className="btn btn-primary" onClick={handleClick}>
                  Все пользователи
               </button>
            </div>
         </>
      );
   } else {
      return <h1>Loading...</h1>;
   }
};

export default UserPage;
