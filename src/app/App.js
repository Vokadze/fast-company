import React, { useState } from 'react'
import Users from './components/users'
import SeachStatus from './components/seachStatus'
import api from './api'

function App(props) {
   console.log(props)
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  //  const renderPhrase = (number) => {
  //    const lastOne = Number(number.toString().slice(-1))
  //    if (number > 4 && number < 15) return 'человек тусанет'
  //    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
  //    if (lastOne === 1) return 'человек тусанет'
  //    return 'человек тусанет'
  //  }

  return (
    <>
      <h2>
        <SeachStatus
          length={users.length}
          // number={users.length}
          // lastOne={SeachStatus.renderPhrase.lastOne}
        />
      </h2>
      <Users button={handleDelete} />
    </>
  )
}

export default App
