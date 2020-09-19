
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import M from 'materialize-css'
import {Link} from 'react-router-dom'
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
const override = css`
  
  margin:15% auto;
  border-color: #3383ce;
`;
const MesAnnonces = () => {
const [data,setData]=React.useState([])
const [loading, setLoading] = useState(true)
    useEffect(() => {
      axios.get('/mesannonces',{
          headers:{
              'authorization':localStorage.getItem('token')
               }})  
       .then((res)=>{
      setData(res.data)
      setLoading(false)})
     }, [])
     const remove=(slug)=>{
      axios.delete(`/mesannonces/delete/${slug}`,{
        headers:{
          'authorization':localStorage.getItem('token')
        }
      }).then((result)=>{
          const newData=data.filter((item)=>{
          return item.slug!==result.slug
   })
        setData(newData)
        M.toast({ html: 'suppression valide', classes: '#66bb6a green lighten-1' })
      }).catch((error)=>{
        M.toast({ html: 'suppression invalide', classes: '#d32f2f red darken-2' })
      })
    }
    return (
     <div style={{width:'80%',margin:'auto',marginTop:'50px'}}>
            {(loading)? <CircleLoader
            css={override}
            size={150}
            color={"#3383ce"}
            loading={setLoading}
    /> :  <div className='car' style={{display:"flex",justifyContent:'space-around'}}>

{data.map (item=>  ( <div className="carde" key={item.slug}>
  <div className="card hoverable  " >
    <div className="card-image waves-effect waves-block waves-light">
    <img  src={`http://localhost:5000/api/annonce/photo/${item.slug}`} alt={item.title} />
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{item.title}<i className="material-icons right">more_vert</i></span>


      <div>
           <Link to={`/mannonces/update/${item.slug}`}>  
           <button className="btn waves-effect waves-light"  name="action">Modifier l'annonce
            <i className="material-icons right">edit</i>
           </button> </Link>

           <button style={{maxWidth:'219px' ,marginTop:'20px'}}  onClick={()=>remove(item.slug)} className="btn waves-effect waves-light"  name="action">Supprimer l'annonce
            <i className="material-icons right">delete_forever</i>
           </button> 
       </div>
    </div>
    <div className="card-reveal">

      <span className="card-title grey-text text-darken-4">{item.title}<i className="material-icons right">close</i></span>
      <p>{item.description}</p>
    </div>
  </div>
</div>
))}



</div>}
        </div>
    )
}

export default MesAnnonces
