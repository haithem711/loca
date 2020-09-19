import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
const override = css`
  
  margin:15% auto;
  border-color: #3383ce;
`;
const Annonce = () => {
  const {slug}=useParams()
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState()

 useEffect(() => {
        async function getData() { 
        axios.get(`/annonces/${slug}`).then((res) => {
           
            setData(res.data)
            setLoading(false)
          
          })}
          getData()
    
      }, [])
    return (
        <div style={{ width: '75%', margin: 'auto' }}>
        {   (loading)? <CircleLoader

css={override}
size={150}
color={"#3383ce"}
loading={setLoading}
/> : 
        <>
        
        <h2 className="header">{data.title}</h2>
       
   <div className="card horizontal">
   
           <img className="imag"  src={`http://localhost:5000/api/annonce/photo/${data.slug}`} alt={data.title}/>
   
           <div className="card-stacked">
             <div className="card-content">
                 <h5>{data.type}</h5>
               <h5> prix:</h5> { (data.type === 'a louer' ? `${data.prix}D/mois`: `${data.prix} Dinar` )}
               <div ><h5> categorie:</h5><p style={{ float: 'inline-end' }} >{data.categorie}</p></div>
               <h5> Desription:</h5>{data.description}
               <h5>annonceur:</h5>{data.postedBy.name}
               <h5>numéro de teléphone:</h5>{data.postedBy.numtel}
               <h5>{data.meubée} </h5>
               <h5 className={(data.disponibilite === 'disponible' ? 'green' : 'red')}> {data.disponibilite} </h5>
   
             </div>
           </div>
         </div>
        
         </>
         }
       </div>
    )
}

export default Annonce
