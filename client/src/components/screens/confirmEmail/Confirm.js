import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../App'
import M from 'materialize-css'
import { useHistory,  useParams } from 'react-router-dom'
import axios from 'axios'
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
const override = css`
  
  margin:15% auto;
  border-color: #3383ce;
`;
const Confirm = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const [confirmed] = useState(true)
  const { token } = useParams()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    axios.post('/confirm', { confirmed, token }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(result => {
        console.log(result)

        // Everything has come back successfully, time to update the state to 
        // reenable the button and stop the <Spinner>. Also, show a toast with a 
        // message from the server to give the user feedback and reset the form 
        // so the user can start over if she chooses.

        M.toast({ html: 'merci pour la confirmation', classes: '#66bb6a green lighten-1' })


        localStorage.setItem("confirmed", JSON.stringify({ ...state, confirmed: result.data.confirmed }))
        dispatch({ type: "CONFIRMED", payload: result.data.confirmed })

      })
      .catch(err => console.log(err))
    const interval = setTimeout(() => {
      console.log('This will run every second!');
      setLoading(false)
    }, 5000);
    return () => clearTimeout(interval);
  })


  return (
    <div>
    {loading ?
        (
          <DotLoader

            css={override}
            size={150}
            color={"#3383ce"}
            loading={setLoading}
          />) : history.push('/home')}
    </div>
  )
}

export default Confirm
