import React from "react";
import Qualitie from "../components/qualitie";

const User = ({ users, user }) => {
   const handleDelete = (userId) => {
      users.filter((user) => user._id !== userId)
   }

   const renderQualities = () => {
      return user.qualities.map((qualitie) => (
         <Qualitie color={qualitie.color} key={qualitie._id} name={qualitie.name} />
      ))
   }

   const renderButton = () => {
      return <button
         onClick={() => handleDelete(user._id)}
         className="btn btn-danger"
      >
         Удалить
      </button>
   }


   return (
      <>
         {users.map((user) => (
            <tr key={user._id}>
               <td>{user.name}</td>
               <td>
                  {renderQualities()}
               </td>
               <td>{user.profession.name}</td>
               <td>{user.completedMeetings}</td>
               <td>{user.rate} /5</td>
               <td>
                  {renderButton()}
               </td>
            </tr>
         ))}
      </>
   )
}



export default User
