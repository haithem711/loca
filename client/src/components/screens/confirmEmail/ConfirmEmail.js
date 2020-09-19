import React,{useContext} from 'react'
import {UserContext} from '../../../App'
import  M from 'materialize-css'
import axios from 'axios';
import { IoMdAlert  } from 'react-icons/io';
const ConfirmEmail = () => {
    const{state}=useContext(UserContext)
 const confirme = () => {
    axios.post('/confirm-email', { email: state.email },
      {
        headers:
        {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log(data)

        // Everything has come back successfully, time to update the state to 
        // reenable the button and stop the <Spinner>. Also, show a toast with a 
        // message from the server to give the user feedback and reset the form 
        // so the user can start over if she chooses.
        M.toast({ html: 'consulter votre messagerie électronique', classes: '#66bb6a green lighten-1' })
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      <button className="confirme" onClick={() => confirme()}> <IoMdAlert />     svp confirme ton email   <IoMdAlert />  </button>
    </div>
  )
}

export default ConfirmEmail
