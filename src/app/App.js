import React, { useState } from 'react'
import Users from './components/user'
import SeachStatus from './components/seachStatus'
import api from './api'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    const updateBookmark = users.map((user) => {
      return user._id !== id ? { ...user, bookmark: !user.bookmark } : user
    })
    setUsers(updateBookmark)
  }

  return (
    <>
      <h2>
        <SeachStatus length={users.length} />
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
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Users
                user={user}
                handleDelete={handleDelete}
                key={user._id}
                handleToggleBookMark={handleToggleBookMark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default App
