import React, { useRef } from 'react'
import './Signup.css';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {
  const history = useHistory()
  const { register, errors, handleSubmit,  watch } = useForm({
    mode: "onChange"
  });
  const password = useRef({});
  password.current = watch("password", "");



  const onSubmit = (data) => {
    axios.post('/signup', {
      name: data.name,
      email: data.email,
      ville: data.ville,
      confirmed: false,
      password: data.password,
      numtel: data.numtel
    })
      .then(data => {
        console.log(data)
        M.toast({ html: 'Merci de votre enregistrement', classes: '#66bb6a green lighten-1' })
        history.push('/signin')
      })
      .catch(error => {
        M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
      });
  };

  return (

    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Inscription</h1>
        <label className="labelREgister" >Nom </label>
        <input className="inputRegister"
          name="name"
          placeholder="haithem"
          ref={register({
            required: "this is a required",
            maxLength: {
              value: 25,
              message: "Max length is 25"
            }
          })}
        />
        {errors.name && <p className="pREgister">{errors.name.message}</p>}

        <label className="labelREgister" htmlFor="email">Email</label>
        <input className="inputRegister"
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
        {errors.email && <p className="pREgister">{errors.email.message}</p>}


        <label className="labelREgister" htmlFor="password">Mot de passe</label>
        <input className="inputRegister"
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
        {errors.password && <p className="pREgister">{errors.password.message}</p>}

        <label className="labelREgister" htmlFor="confirmation">Confirmer ton Mot de passe</label>
        <input className="inputRegister"
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
        {errors.confirmation && <p className="pREgister">{errors.confirmation.message}</p>}

        <label className="labelREgister" htmlFor="ville">ville</label>
        <input className="inputRegister"
          name="ville"
          placeholder="ville"
          ref={register({
            required: "this is a required",
            maxLength: {
              value: 15,
              message: "Max length is 15"
            }
          })}
        />
        {errors.ville && <p className="pREgister">{errors.ville.message}</p>}

        <label className="labelREgister" htmlFor="numtel">numéro du téléphone</label>
        <input className="inputRegister"
          name="numtel"
          placeholder="numéro du téléphone"
          ref={register({
            required: "this is a required",
            maxLength: {
              value: 10,
              message: "Max length is 10"
            }
          })}
        />
        {errors.numtel && <p className="pREgister">{errors.numtel.message}</p>}




        <input className="inputRegister" type="submit" />
      </form>
    </div>
  );
}
export default Signup
