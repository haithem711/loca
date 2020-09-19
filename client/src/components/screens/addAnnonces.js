import React,{useState,useRef,useEffect} from 'react'
import {Map,TileLayer,Marker,ZoomControl}from 'react-leaflet'
import  {useHistory} from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import M from 'materialize-css'
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl:require('leaflet/dist/images/marker-icon.png'),
    shadowUrl:require('leaflet/dist/images/marker-shadow.png')
});

const AddAnnonces = () => {
    const  history=useHistory()
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
    const  addModal = useRef(null)

   
   useEffect(()=>{
    M.Modal.init(addModal.current)
},[])
   
const handleChange = (e) => {
  const photo = e.target.files[0]; // accesing file
  setPhoto(photo); // storing file
}

  const [state, setState] = useState({x: 0, zoom: 7,marker:({lat:33.457103164901056, lng:9.025008521737607})})

   
  
const addMarker = (e) => {
    setState ({
     x:1, 
     zoom:17,
     marker :e.latlng
     })
   M.Modal.getInstance(addModal.current).open()
    }


const Add =()=>{
  var formData = new FormData()
  formData.set('lat',state.marker.lat)
  formData.set('lng',state.marker.lng)
  formData.append('title', title)
  formData.append('type', type)
  formData.append('meublée', meublée)
  formData.append('categorie', categorie)
  formData.append('disponibilite', disponibilite)
  formData.append('description', description)
  formData.append('prix', prix)
  formData.append('régions', régions)
  formData.append('adresse', adresse)
  formData.append('photo', photo)

  axios.post('/new',formData,{
      headers:{
        Accept: 'application/json',
        'authorization':localStorage.getItem('token')
         }})
.then(res =>
  { history.push('/')
    M.toast({ html: 'uploaded successfully', classes: '#66bb6a green lighten-1' })})
    .catch((error) => {
      
      M.toast({ html: error.response.data.error, classes: '#d32f2f red darken-2' })
    })
}
    return (
        <div>
          <div>
            <h3 className='title'> marquer la position de votre logement dans la map </h3>
          </div>
         
            <Map style={{ width:'70%',marginLeft:'15%',marginTop:'20px'}}  center={[34, 10]} zoom={7} minZoom={7} ZoomControl={false} onClick={addMarker}>
            <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <ZoomControl position={"bottomright"}>

          </ZoomControl>
          {state.x > 0 && (<Marker   position={state.marker}>
        </Marker>)}
            </Map>
           


        <div>
          <div id="modal1" className="modal" ref={addModal}>
            <div className="modal-content">
              <h4>Ajouter votre annonce:</h4>

              <div className="row">
                <div className="input-field col s6">
                  <input value={title} id="first_name" type="text" className="validate" onChange={(e) => setTitle(e.target.value)} />
                  <label className="active" htmlFor="first_name"> Title:</label>


                  <select onChange={(e) => setType(e.target.value)} value={type} className="browser-default">
                    <option defaultValue>Type </option>
                    <option value="a louer" >a louer</option>
                    <option value="a vendre" >a vendre </option>

                  </select>
                  <select onChange={(e) => setCategorie(e.target.value)} value={categorie} className="browser-default">
                    <option defaultValue>categorie</option>
                    <option value="Appartements" >Appartements</option>
                    <option value="Maisons" >Maisons</option>
                    <option value="Villas" >Villas</option>
                    <option value="Locaux commerciaux"  >Locaux commerciaux</option>
                    <option value="Bureaux"  >Bureaux</option>
                  </select>


                  <select onChange={(e) => setDisponibilite(e.target.value)} value={disponibilite} className="browser-default">
                    <option defaultValue>disponibilite</option>
                    <option value="disponible" >disponible</option>
                    <option value="indispo" >indisponible </option>

                  </select>



                  <div className="input-field col s12">
                    <textarea id="textarea" className="materialize-textarea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="textarea">Description</label>
                  </div>
                  <select onChange={(e) => setRégions(e.target.value)} value={régions} className="browser-default">
                    <option defaultValue>Régions</option>

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
                    <option defaultValue>meublée</option>
                    <option value="meublée" >meublée</option>
                    <option value="non meublée" >non meublée</option>
                  </select>
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" value={adresse} onChange={(e) => setAdresse(e.target.value)}></textarea>
                    <label htmlFor="textarea1">adresse de l'annonce:</label>
                  </div>
                  <input placeholder="prix" value={prix} id="seconde_name" type="number" className="validate" onChange={(e) => setPrix(e.target.value)} />
                  { (type === 'a louer' ? `D/mois`: `Dinars` )}


                </div>





                <label style={{ marginLeft: "5px" }} htmlFor="file" className="label-file">Choisir une image</label>
                <input className="input-file" id="file" type="file" onChange={handleChange} />




              </div>
            </div>
            <div style={{ marginBottom: '20px', float: 'center' }} className="modal-footer">

              <button className="btn waves-effect waves-light" name="action" onClick={() => Add()}>ajouter  votre annonce
            <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>



        </div>
    )
}

export default AddAnnonces
