import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import Loading from './Loading'
import axios from 'axios'
import { useParams} from "react-router-dom";
//import Loading from './Loading';
//import { APP_URL } from '../../config'
const UpdateAnnonce = () => {
  
    const { slug } = useParams();
    const [data,setData]=useState()
    const[loading,setLoading]=useState(true)
    const[title,setTitle]=useState('')
    const[photo,setPhoto]=useState('')
    const[description,setDescription]=useState('')
    const [categorie, setCategorie] = useState("")
    const [prix, setPrix] = useState(0)
    const [meublée, setMeublée] = useState("")
    const [disponibilite, setDisponibilite] = useState("")
    const [régions, setRégions] = useState("")
    const [adresse, setAdresse] = useState("")
    const [type, setType] = useState("")
   

    useEffect(() => {
        async function getData() { 
        axios.get(`/mesannonces/${slug}`, {headers: {
          
            'authorization':localStorage.getItem('token')

        }},)
            .then((res) => {
               
                setData(res.data)
                setLoading(false)

            })}
            getData()

    }, [])


    const handleChange = (e) => {

        const photo = e.target.files[0]; // accesing file
        
        setPhoto(photo); // storing file
    }

    
    const Updateannonce = () => {

        var formData = new FormData()
        if (description) { formData.set('description', description) }
        if (type) { formData.set('type', type) }
        if (adresse) { formData.set('adresse', adresse) }
        if (régions) { formData.set('régions', régions) }
        if (disponibilite) { formData.set('disponibilite', disponibilite) }
        if (photo) { formData.set('photo', photo) }
        if (prix) { formData.set('prix', prix) }
        if (meublée) { formData.set('meublée', meublée) }
        if (categorie) { formData.set('categorie', categorie) }

        axios.put(`/mesannonces/update/${slug}`, formData, {
            headers: {
                Accept: 'application/json',
                'authorization':localStorage.getItem('token')

            },
        }).then((result) => {
           
            M.toast({ html: 'Updated Succesfully', classes: '#66bb6a green lighten-1' })
        })

            // localStorage.setItem('movies',JSON.stringify(res.data))
            // dispatch({type:'Movies',payload:{movies:{title,description,genres,rating}}})
            .catch((error) => {
              
                M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
            })
    }
    return (
        <div style={{ width: '75%', margin: 'auto' }}>


          { (loading)?<Loading/>: <div>
              <h1>Modifier</h1>
           

            <div className="row update">
              <div className='mobil'>
                <div className="input-field col s6 ">
                  <input value={title} id="first_name" placeholder={data.title} type="text" className="validate" onChange={(e) => setTitle(e.target.value)} />
                  <label className="active" htmlFor="first_name"> Title:</label>
                  
                 
                  <select onChange={(e) => setType(e.target.value)} value={type} className="browser-default ">
                    <option  defaultValue>{data.type} </option>
                    <option value="a louer" >a louer</option>
                    <option value="a vendre" >a vendre </option>
                   
                  </select>
                  <select onChange={(e) => setCategorie(e.target.value)} value={categorie} className="browser-default">
                    <option  defaultValue>{data.categorie}</option>
                    <option value="Appartements" >Appartements</option>
                    <option value="Maisons" >Maisons</option>
                    <option value="Villas" >Villas</option>
                    <option value="Locaux commerciaux"  >Locaux commerciaux</option>
                    <option value="Bureaux"  >Bureaux</option>
                  </select>
                  

                  <select onChange={(e) => setDisponibilite(e.target.value)} value={disponibilite} className="browser-default">
                    <option  defaultValue>{data.disponibilite}</option>
                    <option value="disponible" >disponible</option>
                    <option value="indispo" >indisponible </option>
                   
                  </select>
                
                  
                 
                  <div className="input-field col s12">
                    <textarea id="textarea" className="materialize-textarea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="textarea">Description</label>
                  </div>
                  <select onChange={(e) => setRégions(e.target.value)} value={régions} className="browser-default">
                    <option  defaultValue>{data.régions}</option>
                    
                    <option value="Zaghouan" >Zaghouan</option>
                    <option value="Tunis" >Tunis</option>
                    <option value="Tataouine" >Tataouine</option>
                    <option value="Sousse" >Sousse</option>
                    <option value="Siliana" >Siliana</option>
                    <option value="Sidi Bouzid" >Sidi Bouzid</option>
                    <option value="Sfax" >Sfax</option>
                    <option value="Nabeul" >Nabeul</option>
                    <option value="Monastir" >Monastir</option>
                    <option value="Médenine" >Médenine</option>
                    <option value="Manouba" >Manouba</option>
                    <option value="Mahdia" >Mahdia</option>
                    <option value="Kef" >Kef</option>
                    <option value="Kébili" >Kébili</option>
                    <option value="Kasserine" >Kasserine</option>
                    <option value="Kairouan" >Kairouan</option>
                    <option value="Jendouba" >Jendouba</option>
                    <option value="Gafsa" >Gafsa</option>
                    <option value="Gabès" >Gabès</option>
                    <option value="Bizerte" >Bizerte</option>
                    <option value="Ben Arous" >Ben Arous</option>
                    <option value="Béja" >Béja</option>
                    <option value="Ariana" >Ariana</option>
                    <option value="Tozeur" >Tozeur</option>
                   
                  </select>
                  <select onChange={(e) => setMeublée(e.target.value)} value={meublée} className="browser-default">
                    <option  defaultValue>meublée</option>
                    <option value="meublée" >meublée</option>
                    <option value="non meublée" >non meublée</option>
                   </select>
                   <div className="input-field col s12">
                    <textarea id="textarea1"  className="materialize-textarea" value={adresse} onChange={(e) => setAdresse(e.target.value)}></textarea>
                    <label htmlFor="textarea1">adresse de l'annonce:</label>
                  </div>
                   <input value={prix} id="seconde_name" type="text" className="validate" onChange={(e) => setPrix(e.target.value)} />
                   { (data.type  === 'a louer' ? `D/mois`: `Dinars` )} 
                  
                 
                </div>
                </div>

                

            
           <div style ={{display:'flex',flexDirection:'column'}}>
                <label style={{ marginLeft: "5px", fontSize:'30px' }} htmlFor="file" className="label-file">modifier l'image</label>
                <input className="input-file" id="file" type="file" onChange={handleChange} />
                <img style={{ width: "300px" }} src={`http://localhost:5000/api/annonce/photo/${data.slug}`}
                              alt={data.title} />
               
                </div>

                  
              </div>

                <button onClick={() => Updateannonce()} style={{ marginBottom: '50px' }} className="btn Center waves-effect waves-light" name="action">Update
    <i className="material-icons right">send</i>
                </button>
            </div>}
        </div>




    )
}


export default UpdateAnnonce
