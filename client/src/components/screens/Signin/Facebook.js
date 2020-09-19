import React, { useState, useContext } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../App'
import axios from 'axios'
import { FaFacebook } from 'react-icons/fa';
const Facebook = () => {
    const [numtel] = useState(null)
    const [password] = useState(null)
    const [ville] = useState(null)
    const history = useHistory()
    const { dispatch } = useContext(UserContext)
    const responseFacebook = (res) => {
        console.log(res);
        axios.post('/signupfacebook',

            {
                name: res.name,
                email: res.email,
                password,
                picture: res.picture.data.url,
                numtel,
                ville,
                confirmed: false,
                accessToken: res.accessToken
            })
            .then(result => {

                localStorage.setItem('token', result.data.token)
                localStorage.setItem('user', JSON.stringify(result.data.user))
                localStorage.setItem('confirmed', JSON.stringify(result.data.confirmed))
                dispatch({ type: 'USER', payload: result.data.user })
                dispatch({ type: 'CONFIRMED', payload: result.data.confirmed })
                history.push('/')

            })
    }


    return (
        <div>
            <FacebookLogin
                appId="383809269265003"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                render={renderProps => (
                <FaFacebook onClick={renderProps.onClick} style={{width:'100px',height:'100px',cursor:"pointer",color:'#0881ec'}}> </FaFacebook>   
                  )}/> <h6 style={{color:'#0881ec'}}> Connecter avec Facebook</h6> <hr/>
        </div>
    )
}

export default Facebook
