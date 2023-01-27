import React from "react";
import Qualitie from "../components/qualitie";
import BookMark from "./bookmark";

const User = ({ user, users, handleDelete, bookmark, handleToggleBookMark, ...rest }) => {

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
                  bookmark={bookmark}
                  handleToggleBookMark={handleToggleBookMark}
               />
            </td>
            <td>
               <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger"
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
