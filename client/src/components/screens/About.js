import React from 'react'

const About = () => {
    return (
        <div style={{ width: '75%', margin: 'auto'}}>
     
        
        <h2 className="header">Loca</h2>
       
   <div   className="card horizontal">
   
           <img className="imag" alt="title" src='https://raw.githubusercontent.com/alDuncanson/react-hooks-snippets/master/icon.png'/>
   
           <div className="card-stacked">
             <div className="card-content">
               <h5> App:</h5> <p>React Hooks , ExpressJs , Mongoose , Materializecss</p>
               <h5>Loca:</h5><p>Application Web pour chercher des maisons à louer ou a vendre</p>
               <h5>Loca © 2020</h5>
            
               
   
             </div>
           </div>
         </div>
        
       
       </div>
    )
}

export default About
