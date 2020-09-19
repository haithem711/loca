import React, { useState, useContext, useEffect } from 'react'
import './Signin.css';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../../App'
import axios from 'axios'
import M from 'materialize-css'
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import Facebook from './Facebook'
const override = css`
  
  margin:15% auto;
  border-color: #3383ce;
`;
const Signin = () => {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { dispatch } = useContext(UserContext)
  const { register, errors, handleSubmit } = useForm({
    mode: "onChange"
  });

  const onSubmit = data => {
    axios.post('/signin',{
      email: data.email,
      password: data.password
    },{
      headers:{
        'Content-Type':'application/json'
    }})


      .then(res => {
       

        M.toast({ html: 'Bonjour', classes: '#66bb6a green lighten-1' })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('confirmed', JSON.stringify(res.data.confirmed))
        dispatch({ type: 'USER', payload: res.data.user })
        dispatch({ type: 'CONFIRMED', payload: res.data.confirmed })
        history.push('/')

      })
      .catch(error => {
        M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
      })



  }
  useEffect(() => {
    const interval = setTimeout(() => {
    
      setLoading(false)
    }, 1000);
    return () => clearTimeout(interval);
  }, []);
  return (
    <div>

      {loading ?
        (
          <CircleLoader

            css={override}
            size={150}
            color={"#3383ce"}
            loading={setLoading}
          />) : (<div className="App">
            <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>

              <h1 className="h1Login">Connexion</h1>
              <Facebook />
              <label className="labelLogin" htmlFor="email">Email</label>
              <input className="inputLogin"
                name="email"
                placeholder="haithem@haithem.com"
                type="text"

                ref={register({
                  required: "this is required",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="pLogin">{errors.email.message}</p>}


              <label className="labelLogin" htmlFor="password">Mot de passe</label>
              <input className="inputLogin" name="password"
                type="password"
                placeholder="password"
                autoComplete="on"
                ref={register({
                  required: "this is required",
                  minLength: {
                    value: 8,
                    message: "Min length is 8"
                  }
                })}
              />
              {errors.password && <p className="pLogin" >{errors.password.message}</p>}

              <input className="inputLogin" type="submit" />
              <Link to='/reset'>  <h5 className="password">Mot de passe oublié?</h5></Link>
              <Link to='/signup'><h5 className="password">Vous n'avez pas de compte ? </h5> </Link>
            </form>

          </div>
        )}
    </div>

  )
}

export default Signin
