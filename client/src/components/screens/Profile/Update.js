import React,{useState,useContext} from 'react'
import {UserContext} from  '../../../App'
import axios from 'axios';
import M from 'materialize-css'
import './Update.css'
const Update = () => {
    const {state,dispatch}=useContext(UserContext)
    const [email,setEmail]=useState('')
    const [numtel,setNumtel]=useState('')
    const [ville,setVille]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [confirmation,setConfirmation]=useState('')
    const editemail=()=>{
    const body = {email:email};
      axios.put('/updateEmail',body,{
      headers: {
          'Content-Type':'application/json',
          "Authorization": localStorage.getItem('token')
      }})
       .then(result=>{ 
      console.log(result)
       M.toast({ html: 'modification email valide', classes: '#66bb6a green lighten-1' })
          localStorage.setItem("user",JSON.stringify({...state,email:result.data.email}))
          dispatch({type:"UPDATEMAIL",payload:result.data.email})  
       })
      .catch(error => {
        M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
          console.log(error.response.data.error)
          });
      }
    const updatepassword = () => {
        const body = { password: password };
        if(password !==confirmation){
            M.toast({ html: 'password invalide', classes: '#d32f2f red darken-2' })
        }
      else { axios.put('/updatePassword', body, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(result => {
            console.log(result)
            M.toast({ html: 'modification  valide', classes: '#66bb6a green lighten-1' })
            })}
    }
    const updateName=()=>{ 
        const body = {name:name};
        axios.put('/updateName',body,{
        headers: {
            'Content-Type':'application/json',
            "Authorization": localStorage.getItem('token')
        }})
    .then(result =>
        {console.log(result)
            
            M.toast({ html: 'modification nom  valide', classes: '#66bb6a green lighten-1' })
            localStorage.setItem("user",JSON.stringify({...state,name:result.data.name}))
            dispatch({type:"NAME",payload:result.data.name})
        }).catch(err=>{console.log(err)
        M.toast({ html: 'modification non valide', classes: '#d32f2f red darken-2' })})
       
        }


    
    const update=()=>{ 
          
       
            const body = {ville:ville
                   ,numtel:numtel  }
           axios.put('/updateu',body,{
            headers: {
                'Content-Type':'application/json',
                "Authorization": localStorage.getItem('token')
            }})
        .then(result =>
            {
               localStorage.setItem("user",JSON.stringify({...state,ville:result.data.ville,numtel:result.data.numtel}))
              // dispatch({type:"UPDATE",payload:(result.data.numtel,result.data.ville)})
            
                M.toast({ html: 'modification   valide', classes: '#66bb6a green lighten-1' })
            }).catch(err=>console.log(err))
            
            
        }
    return (
        <div >
            <h1>Mon profile</h1>

            <div className="profile">
                <button className="myButton1" onClick={() => { updateName() }}> changer ton Nom et Prenom</button>
                <input className="inputProfile"
                    type="text"
                    name="numtel"
                    placeholder={state && state.name}
                    onChange={(e) => setName(e.target.value)} />



                <button className="myButton1" onClick={() => { update() }}>Changer numéro de téléphone ,ville </button>
                <input className="inputProfile"
                    type="text"
                    name="numtel"
                    placeholder={state && state.numtel}
                    onChange={(e) => setNumtel(e.target.value)} />



                <input className="inputProfile"
                    type="text"
                    name="adresse"

                    placeholder={state && state.ville}
                    onChange={(e) => setVille(e.target.value)} />





                <button className="myButton1" onClick={() => { editemail() }}>modifier email</button>

                <input className="inputProfile"
                    type="text"
                    name="email"
                    placeholder={state && state.email}
                    onChange={(e) => setEmail(e.target.value)}

                />


                <button className="myButton1" onClick={() => { updatepassword() }}>ajouter ou modifier mot de passe</button>

                <input className="inputProfile"
                    type="text"
                    name="password"
                    placeholder=" Nouveau Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}

                />
                <input className="inputProfile"
                    type="text"
                    name="confirmation"
                    placeholder="confirmer mot de masse"
                    onChange={(e) => setConfirmation(e.target.value)}

                />
            </div>
        </div>
    )
}

export default Update
