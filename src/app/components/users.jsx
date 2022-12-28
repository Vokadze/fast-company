import React, { useState } from 'react'
import User from '../components/user'
import SeachStatus from '../components/seachStatus'
import Bookmark from '../components/bookmark'

import api from '../api'

const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll())

   const handleDelete = (userId) => {
      setUsers(users.filter((user) => user._id !== userId));
   };

   const [markers, setMarkers] = useState([Bookmark.markers])
   console.log(markers);
   const handeleToggleBookMark = () => {
      setMarkers([Bookmark.markers.id])
   }

   return (
      <>
         <h2>
            <SeachStatus length={users.length} />
         </h2>

         {users.length > 0 && (
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">Имя</th>
                     <th scope="col">Качества</th>
                     <th scope="col">Профессия</th>
                     <th scope="col">Встретился, раз</th>
                     <th scope="col">Оценка</th>
                     <th scope="col">Избранное</th>
                     <th />
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <User
                        user={user}
                        handleDelete={handleDelete}
                        onClick={() => handeleToggleBookMark}
                     />
                  ))}
               </tbody>
            </table>
         )}
      </>
   )
}

export default Users
