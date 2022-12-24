import React, { useState } from 'react'
import User from '../components/user';
//import Qualitie from "../components/qualitie";


import api from '../api'


const Users = (props) => {
   console.log(props);
   const [users, setUsers] = useState(api.users.fetchAll());

   //const handleDelete = (userId) => {
   //   setUsers(users.filter((user) => user._id !== userId));
   //};

   //const renderPhrase = (number) => {
   //   const lastOne = Number(number.toString().slice(-1));
   //   if (number > 4 && number < 15) return "человек тусанет";
   //   if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
   //   if (lastOne === 1) return "человек тусанет";
   //   return "человек тусанет";
   //};

   return (
      <>
         {users.length > 0 && (
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">Имя</th>
                     <th scope="col">Качества</th>
                     <th scope="col">Профессия</th>
                     <th scope="col">Встретился, раз</th>
                     <th scope="col">Оценка</th>
                     <th />
                  </tr>
               </thead>
               <tbody>
                  {User() }
               </tbody>
            </table>
         )}
      </>
   );
};

export default Users
