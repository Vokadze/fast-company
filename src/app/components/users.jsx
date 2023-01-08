import React, { useState } from 'react'
import User from '../components/user'
import SeachStatus from '../components/seachStatus'
import BookMark from '../components/bookmark'

import api from '../api'

const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll())

   const handleDelete = (userId) => {
      setUsers(users.filter((user) => user._id !== userId));
   };

   const [markers, setMarkers] = useState(BookMark.return)
   const handeleToggleBookMark = (id) => {
      setMarkers(prevState => prevState.filter((marker) => marker !== id))
      //console.log('id', id);
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
                        key={user._id}
                        keyicon={markers}
                        status={BookMark.status}
                        onClick={handeleToggleBookMark}
                     />
                  ))}
               </tbody>
            </table>
         )}
      </>
   )
}

export default Users
