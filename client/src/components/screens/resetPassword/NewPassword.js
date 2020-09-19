import React ,{useRef}from 'react'
import{useHistory,useParams}from 'react-router-dom'
import M from 'materialize-css'
import {useForm} from "react-hook-form";
import axios from 'axios';

const NewPassword = () => {
    const {
        register,
        handleSubmit,
        errors,
        watch
       } = useForm();
    
    const {token} = useParams()
    const password = useRef({});
    password.current = watch("password", "");
  const history = useHistory()
  const onSubmit = (data) => {
    axios.post('/newpassword', {
      password: data.password,
      token
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        if (data.error) {
          alert('error')
        }
        else {
          M.toast({ html: 'valide mot de passe', classes: '#66bb6a green lighten-1' })
          history.push('/signin')
        }
      }).catch(err => {
        console.log(err)
      })
  };  
     
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>ajouter nouveau mot du passe</h1>
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
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
          {errors.password && <p>{errors.password.message}</p>}
          <label htmlFor="confirmation">Confirmer ton Mot de passe</label>
          <input
            name="confirmation"
            type="password"
            placeholder="password"
            ref={register({
              required: "this is required",
              minLength: {
                value: 8,
                message: "Min length is 8"
              },
              validate: value =>
                value === password.current || "The passwords do not match"
            })}
          />
          {errors.confirmation && <p>{errors.confirmation.message}</p>}

          <input type="submit" />
        </form>
      </div>
  )
}


export default NewPassword