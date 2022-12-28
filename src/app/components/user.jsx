import React from "react";
import Qualitie from "../components/qualitie";
import Bookmark from "../components/bookmark"

const User = ({ user, handleDelete }) => {

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
               <span>
                  <Bookmark status={Bookmark.status} />
               </span>
            </td>
            <td>
               <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger"
               >
                  Удалить
               </button>
            </td>
         </tr>
      </>
   )
}



export default User
