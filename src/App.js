import './App.css'
import Cards from './components/Cards.jsx'
import SearchBar from './components/SearchBar.jsx'
import characters, { Rick } from './data.js'
import Nav from './components/Nav.jsx'
import React from 'react'
import { Route , Routes } from "react-router-dom";
import About from './components/About'
import { useLocation } from 'react-router-dom'
import Form from './components/Form'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import { useEffect } from 'react'

import Favorites from './components/Favorites'
import Detail from './components/Detail'


function App () {

  
  
  const [characters, setCharacter ] = React.useState([]);
 
  const location = useLocation();
  
  function onSearch(character){

    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
         if (data.name) {
          
          for ( let elemento of characters){
            if (data.id === elemento.id) return window.alert('Ese personaje ya fue agregado')
            }
            //-----------------------------------------------------------------------------------------------------
            setCharacter((oldChars) => [...oldChars, data]);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
  }

  function onClose(Id) {
    setCharacter(characters.filter(char=>char.id !== Id))
  }
  

  return (
    
    <div className='App' style={{ padding: '25px' }}>   
        
        {location.pathname === '/' ? <Form/> : null}
        {location.pathname === '/' ? null : <Nav OnSearch={onSearch}/>}
        <Routes>
            <Route exact path="/home" element={ characters.length === 0 ? (
                <img></img>
                    ) : ( <div>                     
                            <Cards characters={characters} onClose={onClose}/> 
                          </div> 
                        ) }>
            </Route> 
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/detail/:id" element={<Detail/>}/>
          <Route exact path="/favorites" element={<Favorites/>}/>
          {/* <Route path="*" element={<Error404/>}> </Route>  añadiendo esta ruta es vulnerable a saltarse el login*/}
        </Routes>    
   </div>
   
  )
}


export default App 





























      //           --------------------------------- Mismos componentes pero ahora sin Routear ---------------------------------
      //  <Nav OnSearch ={onSearch}/>  
 
      // <div>
      //   <Cards characters={characters} onClose={onClose}/> // Ahora este atributo está en Route porque sino se repite
      // </div>    

      // forma de introducir los componentes en version 6.4.4 que me quedó:      element={<Cards characters={characters} 


      //---------------------------Version 5.3.4-----------------
      // <Route  path="/">  <Nav OnSearch={onSearch}/>   </Route>
      // <Route  exact path="/favorites">  <Favorites/>  </Route>

      //   <Route exact path="/home">
      //       <div>
      //       <Cards characters={characters} onClose={onClose}/> 
      //       </div> 
      //   </Route>

      // <Route exact path="/detail/:id" component={Detail}/>

      // <Route exact path="/about">
      //     <About/>
      // </Route> 


      //<Route  path="/" element={<Nav OnSearch={onSearch}/> }></Route>