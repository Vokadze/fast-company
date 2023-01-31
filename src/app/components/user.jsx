import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = ({
   _id, 
   name, 
   qualities, 
   profession, 
   completedMeetings, 
   rate, 
   handleDelete, 
   bookmark, 
   onToggleBookMark
}) => {
   return (
      <>
         <tr key={_id}>
            <td>{name}</td>
            <td>
               {qualities.map((qualitie) => (
                  <Qualitie color={qualitie.color} key={qualitie._id} name={qualitie.name} />
               ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
               <BookMark
                  status={bookmark}
                  onClick={()=>onToggleBookMark(_id)}
               />
            </td>
            <td>
               <button
                  className={"btn btn-danger"}
                  onClick={() => handleDelete(_id)}
               >
                  Удалить
               </button>
            </td>
         </tr>
      </>
   )
}

export default User