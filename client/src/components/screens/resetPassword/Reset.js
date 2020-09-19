import React from 'react'
import{Link}from 'react-router-dom'
import M from 'materialize-css'
import {useForm} from "react-hook-form";
import axios from 'axios';

const Reset = () => {
 const {
      register,
      handleSubmit,
      errors,
     } = useForm({mode: "onChange"});
  
    
    const onSubmit = (data) => {
      axios.post('/reset-password',{ 
          email:data.email
        },{headers:{
            'Content-Type':'application/json'
        }})
        .then(data => {console.log(data)
        M.toast({ html: 'pls check your mail', classes: '#66bb6a green lighten-1' })}
         )
       };  
     
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Récupperer mot de passe</h1>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="haithem@hajri"
            type="text"

            ref={register({
              required: "this is required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input type="submit" />
          <Link to='/signup'><h5 className="password">Vous n'avez pas de compte ? </h5> </Link>
        </form>
      </div>
    )
}

export default Reset