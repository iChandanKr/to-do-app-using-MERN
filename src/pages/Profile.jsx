import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';


const Profile = () => {

  const { user, loading, isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return (<Navigate to={"/login"} />);
  }
  console.log({ user });
  // console.log(user.email);
  return (
    loading ? <Loader /> : (

      <div> <h1 style={{ margin: 0, padding: 10, }}> {user ? user.name : null}</h1>
        <p style={{ margin: 0, padding: 10, fontSize: 20 }}>{user ? user.email : null}</p>

      </div>
    )
  )
}

export default Profile;



