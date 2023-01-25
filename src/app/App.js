import React, { useState } from 'react'
import Users from './components/users'
import SeachStatus from './components/seachStatus'
import api from './api'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  // const [marker, setMarker] = useState(users.icons[0])
  // console.log(marker)

  //  const handleToggleBookMark = (id) => {
  //    console.log(id)
  //    const updateBookmark = users.icons.map((icon) => {
  //      return icon.id === id ? { ...icon, bookmark: !icon.bookmark } : icon
  //    })

  //    users.setMarker(updateBookmark)
  //  }

  return (
    <>
      <div>
        <h2>
          <SeachStatus length={users.length} />
        </h2>
        <Users
          handleDelete={handleDelete}
              usersArr={users}
            //  iconArr={icons}
          // iconsArr={users.icons}
          // status={BookMark.status}
          // keyboomark={users.boomark}
          // keymark={id}
          // handleToggleBookMark={handleToggleBookMark}
        />
      </div>
    </>
  )
}

export default App
