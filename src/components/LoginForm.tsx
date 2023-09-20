import React, {FC, useContext, useState} from "react";
import {Input, Button} from "reactstrap"
import { Context } from "..";
import { observer } from 'mobx-react-lite';
 const  LoginForm: FC = () => {
     const [email, setEmail] = useState<string>('')
     const [password, setPassword] = useState<string>('')
     const {store} = useContext(Context)

     const resetInputLogin = () =>{
        setEmail('');
        setPassword('')
        store.login(email, password)
        
     }
     const resetInputRegister = () =>{
        setEmail('');
        setPassword('')
        store.registration(email, password)
     }

    return (
        <div>
            <Input
            type="text"
            placeholder="please send your email"
            onChange={(e) => setEmail(e.target.value)} 
            value={email}            
            />
            <Input
            type="password"
            placeholder="please send your email"
            onChange={(e) => setPassword(e.target.value)}
            value={password}            
            />
            <Button type="submit" onClick={resetInputLogin}>Sign in</Button>
            <Button typeof="submit" onClick={resetInputRegister}>Sign up</Button>
        </div>
    )


    }


    export default observer(LoginForm);