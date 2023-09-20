import React, { FC, useContext, useEffect, useState } from 'react';
import LoginFrom from "./components/LoginForm"
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import './App.css';
import { IUser } from './models/IUser';
import UserService from './service/UserService';


const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  if(store.isLoading){
    return <div>Loading...</div>
  }

   const getUsers = async() =>{
    try {
      const response = await UserService.fetchUsers();
      setUsers(response?.data)
    } catch (e: any) {
        console.log(e.response?.data?.message);
        
    }
  } 
  

  if (!store.isAuth) {
    return (
      <div>
        <LoginFrom />
        <button onClick={getUsers}>Userleri göstər</button>
      </div>
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `istifadəçi qeydiyyatdan keçdi  ${store.user?.email}` : 'Qeydiyyatdan keçin'}</h1>
      <h1>{store.user.isActivated ? 'Hesab e-poçtla təsdiqləndi' : 'hesabınızı təsdiqləndi!!!'}</h1>
      <button onClick={() => store.logout()}>Çıxış</button>
      <div>
      <button onClick={getUsers}>Userleri göstər</button>
      </div>
      {
        users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))
      }
    </div>
  )
}

export default observer(App);