import React from "react";
import Qualitie from "../components/qualitie";
import BookMark from "../components/bookmark"

const User = ({ user, handleDelete, handeleToggleBookMark, id, marker, ...rest }) => {

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
               <button
                  keyicon={marker}
                  //status={BookMark.status}
                  onClick={() => handeleToggleBookMark()}
                  className="btn btn-ligth border-dark m-1 p-1">
                  <BookMark
                     //key={BookMark.id}
                     status={BookMark.status}
                  //onClick={() => handeleToggleBookMark()}
                  />
               </button>
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
