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

   //const icons = [
   //   [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
   //      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
   //   </svg>],
   //   [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
   //      <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
   //   </svg>]
   //]

   const [iconses, setIconses] = useState([BookMark])
   console.log(iconses);

   const handleToggleBookMark = (id) => {
      const updateBookmark = users.map((user) => {
         return user._id !== id ? { ...user, bookmark: !user.bookmark } : user
      })
      setIconses(updateBookmark)
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
                        //keyicons={icons}
                        //handleToggleBookMark={handleToggleBookMark}
                        bookmark={user.bookmark}
                        handleToggleBookMark={handleToggleBookMark}
                     />

                  ))}
               </tbody>
            </table>
         )}
      </>
   )
}

export default Users