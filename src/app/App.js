import React, { useState } from 'react'
import Users from './components/users'
import SeachStatus from './components/seachStatus'
import api from './api'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  return (
    <div>
      <h2>
        <SeachStatus length={users.length} />
      </h2>
      <Users handleDelete={handleDelete} />
    </div>
  )
}

export default App
