import React, { useState,useEffect } from 'react'
import {useForm} from "react-hook-form";
import axios from 'axios'
import M from 'materialize-css'
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import { useHistory } from 'react-router-dom';
const override = css`
  
  margin:15% auto;
  border-color: #3383ce;
`;
const Contact = () => {
    const [loading,setLoading]=useState(true)
    const history=useHistory()
    
      const { register, errors, handleSubmit} = useForm({
          mode: "onChange"
        });
  const onSubmit = data => {
    axios.post('/contact', {
      email: data.email,
      name: data.name,
      message: data.message
    })
      .then(res => {
        M.toast({ html: 'Nous avons bien reçu votre message. Merci ! Nous ferons de notre mieux pour vous répondre dès que possible.', classes: '#66bb6a green lighten-1' })
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
          <DotLoader

            css={override}
            size={150}
            color={"#3383ce"}
            loading={setLoading}
          />) : (<div className="App">
            <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>

              <h1 className="h1Login">Contactez-nous</h1>
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


              <label className="labelLogin" htmlFor="message">votre message:</label>
              <textarea className='textarea'
                name="message"
                placeholder="saisir votre message"
                ref={register({
                  required: "this is required",
                })}
              />
              {errors.message && <p className="pLogin">{errors.message.message}</p>}
              <input className="inputLogin" type="submit" />
            </form>
          </div>
        )}
    </div>
  )
}

export default Contact
