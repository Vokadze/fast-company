import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = ({ user, users, _id, id, name, qualities, profession, completedMeetings, rate, handleDelete, handleToggleBookMark, bookmark, ...rest }) => {
   return (
      <>
         <tr key={user._id}>
            <td>{user.name}</td>
            <td>
               {user.qualities.map((qualitie) => (
                  <Qualitie color={qualitie.color} key={qualitie._id} name={qualitie.name} />
               ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td>
               <BookMark
                  bookmark={user.bookmark}
                  handleToggleBookMark={handleToggleBookMark}
               />
            </td>
            <td>
               <button
                  className={"btn btn-danger"}
                  onClick={() => handleDelete(user._id)}
                  {...rest}
               >
                  Удалить
               </button>
            </td>
         </tr>
      </>
   )
}

export default User