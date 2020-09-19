import React,{useEffect,useContext, createContext,useReducer} from 'react';
import './App.css';
import {BrowserRouter ,Switch, Route,useHistory} from "react-router-dom";
import Signup from './components/screens/Signup/Signup'
import Signin from './components/screens/Signin/Signin'
import Home from './components/screens/Home'
import About from './components/screens/About'
import Navbare from './components/Navbar'
import Contact from './components/screens/Contact'
import Update from './components/screens/Profile/Update'
import MesAnnonces from './components/screens/mesAnnonces'
import Annonce from './components/screens/Annonce'
import AddAnnonces from './components/screens/addAnnonces'
import Reset from './components/screens/resetPassword/Reset'
import NewPassword from './components/screens/resetPassword/NewPassword'
import Confirm from './components/screens/confirmEmail/Confirm'
import ConfirmEmail from './components/screens/confirmEmail/ConfirmEmail'
import{reducer,initialState}from './reducers/Reducer'
import UpdateAnnonce from './components/screens/UpdateAnnonce';
export const UserContext=createContext()

const Routing=()=>{
  const {dispatch}=useContext(UserContext)
  const history=useHistory()

useEffect(() => {
  const user=JSON.parse( localStorage.getItem('user'))
  if(user){
    dispatch({type:'USER',payload:user})
   }
    else{
     
       if(!history.location.pathname.startsWith('/reset'))
            history.push('/signin')
     
    }
  }
 , [])
  return(
    <Switch>
        <Route exact path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/contact">
      <Contact />
    </Route>
    <Route path="/addannonces">
      <AddAnnonces />
    </Route>
    <Route exact path="/update">
      <Update />
    </Route>
    <Route exact path="/mannonces">
      <MesAnnonces />
    </Route>
   
    <Route exact path="/reset">
      <Reset/>
    </Route>
    <Route exact path="/reset/:token">
      <NewPassword/>
    </Route>
    <Route  exact path="/:slug">
      <Annonce />
    </Route>
    <Route exact path="/confirm">
        <ConfirmEmail/>
      </Route>
      <Route path="/confirm/:token">
        <Confirm/>
      </Route>
      <Route path="/mannonces/update/:slug">
        <UpdateAnnonce/>
      </Route>
  </Switch>
  )
 }
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
  
     <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
     <Navbare/>
     {state&&state.confirmed===false&& <div><ConfirmEmail/></div> }
     <Routing/>
     </BrowserRouter>
     </UserContext.Provider>
     
  );
}

export default App;
