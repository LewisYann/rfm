import * as React from 'react';
import { createBrowserHistory } from "history";
import { Redirect } from 'react-router-dom';


const history = createBrowserHistory()

export default function Logout() {

    function logout() {
        localStorage.removeItem('user')

        return (
            history.push('/login'))
    }




    return logout()
        

    
}