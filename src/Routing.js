import React, { useReducer } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './Component/globalstate/router/Home'
import { globalstate } from './Component/globalstate/context/Context'
import { initialstate,Reducer } from './Component/globalstate/context/Reducer'
import { Cart } from './Component/globalstate/router/Cart'
import { Fav } from './Component/globalstate/router/Fav'
import { Details } from './Component/globalstate/router/Details'


export const Routing = ()=>{

    const [state, dispatch] = useReducer(Reducer,initialstate) //function, initialstate
    

    return(
       <globalstate.Provider value= {{state,dispatch}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/cart' element={<Cart/>}></Route>
                    <Route path='/fav' element={<Fav/>}></Route>
                    <Route path='/det/:id' element={<Details/>}></Route>
                </Routes>
            </BrowserRouter>
        </globalstate.Provider>
    )
}