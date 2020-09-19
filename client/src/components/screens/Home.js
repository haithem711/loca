import React,{useState,useEffect} from 'react'
import MarkerClusterGroup from "react-leaflet-markercluster";
import {Map,TileLayer,Marker,Popup,ZoomControl}from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link} from 'react-router-dom'
import axios from 'axios'
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
const override = css`
  
  margin:15% auto;
  border-color: #3383ce;
`;
    const Home = () => {
    const[data,setData]=useState([])
    const [active , setActive]=useState(false)
    const[loading,setLoading]=useState(true)
    const [categorie, setCategorie] = useState("")
    const [prix, setPrix] = useState(1)
    const [meuble, setMeublée] = useState("")
    const [disponibilite, setDisponibilite] = useState("")
    const [regions, setRégions] = useState("")
    const [type, setType] = useState("")
    
    useEffect(() => {
      axios.get(`/annonce/filtre?categorie=${categorie}&disponibilite=${disponibilite}&meuble=${meuble}&type=${type}&regions=${regions}&prix=${prix}`).then((result)=>{
          setData(result.data)
          setLoading(false)
          setActive(false)
       })
      },[active])
     
return (
  <div >
    <div className="col s12 m7">
      <h2 className="header"></h2>
      <div className="card horizontal">
        <div className="card-image " style={{ marginLeft: '10%', marginRight: '10%', marginTop: '150px' }}>
          <h5> Filtre :</h5>
          <select onChange={(e) => {
            setType(e.target.value)
            setActive(true)
          }} value={type} className="browser-default filtre">
            <option value="">Type </option>
            <option value="a louer" >a louer</option>
            <option value="a vendre" >a vendre </option>

          </select>
          <select onChange={(e) => {
            setCategorie(e.target.value)
            setActive(true)
          }} value={categorie} className="browser-default filtre">
            <option value="">categorie</option>
            <option value="Appartements" >Appartements</option>
            <option value="Maisons" >Maisons</option>
            <option value="Villas" >Villas</option>
            <option value="Locaux commerciaux"  >Locaux commerciaux</option>
            <option value="Bureaux"  >Bureaux</option>
          </select>


          <select onChange={(e) => {
            setDisponibilite(e.target.value)
            setActive(true)
          }}
            value={disponibilite}
            className="browser-default filtre">
            <option value="">disponibilite</option>
            <option value="disponible" >disponible</option>
            <option value="indispo" >indisponible </option>

          </select>
          <select onChange={(e) => {
            setRégions(e.target.value)
            setActive(true)
          }} value={regions} className="browser-default filtre">
            <option value="">Régions</option>

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
          <select onChange={(e) => {
            setMeublée(e.target.value)
            setActive(true)
          }} value={meuble} className="browser-default filtre">
            <option value="">meublée</option>
            <option value="meublée" >meublée</option>
            <option value="non meublée" >non meublée</option>
          </select>
          <input placeholder="prix" value={prix} id="seconde_name" type="text" className="validate filtre" onChange={(e) => setPrix(e.target.value)} /><p>{ (type === 'a louer' ? `${prix}D/mois`: `${prix}Dinars` )}</p>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            {(loading) ? <CircleLoader
                        css={override}
                        size={150}
                        color={"#3383ce"}
                        loading={setLoading}/> : <Map className='map' center={[34, 10]} zoom={7} ZoomControl={false} minZoom={6} >
          
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ZoomControl position={"bottomright"}>

              </ZoomControl>
              <MarkerClusterGroup>
                {
                  data.map(item =>
                    <Marker key={item.slug} position={[item.lat, item.lng]}>
                      <Popup >

                        <div>
                          <div style={{ display: "flex" }}>
                            <Link to={`/${item.slug}`}> <h6>{item.title}</h6> </Link>
                            <img style={{ width: "60px" }} src={`http://localhost:5000/api/annonce/photo/${item.slug}`}
                              alt={item.title} />
                          </div>
                          <div>
                            <p>{item.mdesc}</p>
                            <p> Annonceur : {item.postedBy.name}</p>
                            <p> numéro de telephone: : {item.postedBy.numtel}</p>
                            <p>{item.type}</p>
                            <p>{ (item.type === 'a louer' ? `${item.prix}D/mois`: `${item.prix} Dinars` )}</p>  
                            <p className={(item.disponibilite === 'disponible' ? 'green' : 'red')}   > {item.disponibilite} </p>
                          </div>

                        </div>

                      </Popup>

                    </Marker>

                  )} </MarkerClusterGroup>



            </Map>}
          </div>


        </div>
      </div>
    </div>

  </div>


    )
}

export default Home
