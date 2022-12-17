import React, { useState } from 'react'
import api from '../api'

const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll())

   const handleDelete = (userId) => {
      setUsers(users.filter((user) => user._id !== userId));
   };

   const renderPhrase = (number) => {
      const lastOne = Number(number.toString().slice(-1));
      if (number > 4 && number < 15) return "человек тусанет";
      if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
      if (lastOne === 1) return "человек тусанет";
      return "человек тусанет";
   };

   //const handleDelete = (userId) => {

   //   users.filter((userId, index) => {
   //      let id = index
   //      return (userId, id)
   //   })
   //   return userId
   //}

   //const handleBtnClick = (id) => {
   //   setUsers(prevState => prevState.filter((userId) => userId !== id))
   //}

   //const renderTags = () => {
   //   return users.map((userId, index) => (
   //      <tr className={`user-${index + 1}`}
   //         onClick={() => handleDelete()}
   //         key={users.index}
   //      >
   //         <td key={userId._id}>{userId.name}</td>
   //         <td className='col'>
   //            {userId.qualities.map((qualiti) => (
   //               <span key={qualiti._id} className={`"badge rounded-pill bg-${qualiti.color} m-1 px-2 "`}>{qualiti.name}</span>
   //            ))}
   //         </td>
   //         <td>{userId.profession.name}</td>
   //         <td>{userId.completedMeetings}</td>
   //         <td>{userId.rate}</td>
   //         <td>
   //            <button
   //               className='btn btn-danger btm-sm m-0 p-1'
   //               onClick={() => handleBtnClick(userId)}
   //            >Удалить</button>
   //         </td>
   //      </tr>
   //   ))
   //}

   //const textTags = () => {
   //   if (renderTags(users.index).length >= 5) {
   //      let text = `${renderTags(users.index).length} человек тусанет с тобой сегодня`
   //      return text
   //   } else if (renderTags(users.index).length >= 2) {
   //      let text = `${renderTags(users.index).length} человека тусанут с тобой сегодня`
   //      return text
   //   } else if (renderTags(users.index).length === 1) {
   //      let text = `${renderTags(users.index).length} человек тусанет с тобой сегодня`
   //      return text
   //   } else if (renderTags(users.index).length === 0) {
   //      let text = "Никто с тобой не тусанет"
   //      return text
   //   }
   //}

   //const getBadgeClasses = () => {
   //   let classes = "badge fs-4 mt-1 "
   //   classes += renderTags(users.index).length === 0 ? "bg-danger" : "bg-primary"
   //   return classes
   //}

   //if (renderTags(users.index).length === 0) {
   //   return <div className='container'>
   //      <span className={getBadgeClasses()}>
   //         {`${textTags()} `}
   //      </span>
   //   </div>
   //}

   return (
      <>

         <h2>
            <span
               className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
            >
               {users.length > 0
                  ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
                  : "Никто с тобой не тусанет"}
            </span>
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
                     <th />
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                           {user.qualities.map((item) => (
                              <span className={"badge m-1 bg-" + item.color} key={item._id}>
                                 {item.name}
                              </span>
                           ))}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate} /5</td>
                        <td>
                           <button
                              onClick={() => handleDelete(user._id)}
                              className="btn btn-danger"
                           >
                              delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
         {/*<div className='container'>

            <span className={getBadgeClasses()}>
               {`${textTags()} `}
            </span>

            <table className="table table-bordered table-sm m-1">
               <thead>
                  <tr className='col-name'>
                     <th scope="col">Имя</th>
                     <th scope="col">Качества</th>
                     <th scope="col">Профессия </th>
                     <th scope="col">Встретился, раз</th>
                     <th scope="col">Оценка</th>
                     <th scope="col"> </th>
                  </tr>
               </thead>

               <tbody>
                  {renderTags()}
               </tbody>

            </table>
         </div>*/}
      </>
   )
}

export default Users
