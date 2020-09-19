import React from 'react'
import { Navbar, Icon,Dropdown, Divider,Button} from 'react-materialize';
import {Link,useHistory} from 'react-router-dom'
import {UserContext}from'../App'
const Navbare = () => {
  const history=useHistory()
 const{state,dispatch}=React.useContext(UserContext)
 
  
    return(
        <Navbar className="nav-wrapper #2962ff blue accent-4 " 
        alignLinks="right"
        brand={<Link key={1} className=" logo" to="/"> Loca </Link>}
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}
      >
       { (!state)?  < Link key={2} to="/signin"> 
          <Button
    node="button"
    style={{
      marginRight: '5px'
    }}
    waves="light"
  >
    Deposer votre annonce
    <Icon left>
      cloud
    </Icon>
  </Button>
          </Link>:< Link key={3} to="/addannonces"> <Button
    node="button"
    style={{
      marginRight: '5px'
    }}
    waves="light"
  >
    Deposer votre annonce
    <Icon left>
      cloud
    </Icon>
  </Button></Link>}
        
        <Link key={4} to="/">
       Acceuil
        </Link>
        <Link to="/about">
        A propos
        </Link>


     

        <Link key={5} to="/contact">
        Contactez-nous
         </Link>
       


        {(!state)&& <Link key={6} to="/signin"> Connexion</Link>}
        { (!state)&& <Link key={7} to="/signup"> Inscription</Link>}










      {(state)&&  <Link key={8} to="/mannonces">
          Mes Annonces
        </Link>}


      {(state)&&  <Dropdown
          id="Dropdown_6"
          options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }}
          trigger={<Link key={9} to="#!">Dropdown{' '}<Icon right>arrow_drop_down</Icon></Link>}
        >
           
          <Link key={10} to="/update">
            modifier mon profile
          </Link>
          <Link key={11} to="/mannonces">
           mes annonces
          </Link>
          <Divider />
          <Link key={12} onClick={()=>{localStorage.clear()
        dispatch({type:'CLEAR'})
         history.push('/signin')}} to="#">
            Deconnecter
          </Link>
        </Dropdown>}
      </Navbar>
    )
}

export default Navbare
        

