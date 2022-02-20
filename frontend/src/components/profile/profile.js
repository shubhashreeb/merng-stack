import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

 const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="profile">

    <p> Welcome to our Profile Page</p>

    {user ?
        <>
        <h3> Hello {user.email} you are logged in! </h3>
        </>
      :
        <>
        <p> There is no userdata</p>
        </>
        }
    </div>
  )
}

export default Profile
