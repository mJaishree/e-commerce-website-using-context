import React, { useContext } from "react";
import { globalstate } from "../context/Context";
import { Link} from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { CgShoppingCart } from "react-icons/cg";
import './Home.scss'; 

export const Home = ()=>{

    const{state,dispatch} = useContext(globalstate)

    //fav
    const fav = (i)=>{
       let a =  state.arr.map((val,ind)=>{

            return val.id===i? {...val,isfav:!val.isfav} : val
        })
        dispatch({type:"addtocart",payload :a})
    }

    //addtocart
    const add = (i)=>{

        let c = state.arr.map((v,ind)=>{

            return v.id === i?{...v,isadd:true} : v
        })
        dispatch({type:"addtocart",payload:c})
    }

    //plus
    const plus = (i)=>
    {
       let d = state.arr.map((v,ind)=>{
            if(v.id === i)
            {
                if(v.count < 10)
                {
                return {...v,count:v.count+1} 
                }
                else
                {
                    alert("You can add upto 10 items only!!!")
                    return v //if return v is not added here it will show error because after 10, it will show alert and it should return value.
                }
            }
            else
            {
                return v
            }
       })

       dispatch({type:"addtocart",payload:d})
    }

    //minus
    const minus = (i,k)=>
    {

        let m

        if(k===1)
        {
             m = state.arr.map((v,ind)=>
        {     
            return v.id === i ?{...v,isadd: false} : v
          
        })
        }
        else{
             m = state.arr.map((v,ind)=>
        {     
            return v.id === i ?{...v,count:v.count-1} : v
          
        })
        }

        dispatch({type:"addtocart",payload:m})

        
    }

    //drop
    const drop = (i)=>{
        console.log(i)

        let p = state.arr.map((val,ind)=>{

            return val.id === i ? {...val,isSelect : !val.isSelect} : val 

        })
        console.log("hi")
        dispatch({type: "addtocart", payload : p})
    }

    //dropdown 
    const handleSelect = (val,i,ind)=>{ //val: value(child), i : id(parent), ind :index(child)
        console.log(val,i,ind)
        console.log("bye")
        let z = state.arr.map((m,n)=>{
            return i === m.id ? {...m,kg :val.kg, price:val.price,isSelect : false, weight:m.weight.map((x,y)=>{return ind === y?{...x,isActive:true}:{...x,isActive:false}})} : m
        })
        dispatch({type:"addtocart",payload: z})
    }

    return(

        <div>

            <nav className="navbar">
                
                <Link to='/fav'><IoHeartOutline /></Link>
                <h1>FRUITS</h1>
                <Link to='/cart'><CgShoppingCart /></Link>
            </nav>
           
            <div className="container align-items-center justify-content-center">

                {
                    state.arr.map((v,i)=>{

                        return(
                            <div  className ="card col-sm-6 col-md-4 col-lg-3" >
                               
                                <Link to={`/det/${v.id}`}>
                                    <div>
                                        <img src={v.image} alt="Tea" className="img-fluid"/>
                                    </div>
                                </Link>
                               
                                <p style={{fontSize:"16px",color:"#c7c7c7",textAlign:"left"}}>Fresho</p>
                                <p style={{fontSize: "20px",textAlign:"left"}}>{v.tname}</p>
                                <div style={{display : "flex"}}>
                                    <h4>₹{v.price}</h4>

                                    <div className="dropdown">
                                        <p onClick={()=>drop(v.id)}>{v.kg}</p>
                                    {
                                        v.isSelect? <div className="dropdown-options">
                                             
                                            {
                                                v.weight.map((value,index)=>{

                                                   
                                                     return <p style={{border: "1px solid black",
                                                        width: "80px",
                                                        height: "25px"}} className="dropOpen" onClick={()=>handleSelect(value,v.id,index)}>{value.kg}<span>{value.price}</span></p> 
                                                })
                                            }
                                        </div> :
                                        ""
                                    }
                                    </div>
                                </div>

                                  <div style={{display : "flex"}}>  
                                <div onClick={()=>fav(v.id)} style={{display:"flex",fontSize: "2em"}}>
                                    {
                                        v.isfav ? <FcLike /> : <IoHeartOutline />
                                    }
                                
                                </div>
                                {
                                    v.isadd ? 
                                    <div> 
                                        <button onClick={()=>minus(v.id,v.count)}> - </button>
                                        <h5 style={{textAlign:"center",color:"#4CAF50"}}> {v.count} </h5>
                                        <button onClick={()=>plus(v.id)}> + </button>

                                    </div> : <button onClick={()=>add(v.id)}>Add</button>

                                }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <footer class="text-center">
                <div class="footer-links">
                    <Link to='/'>Home</Link> |
                    <Link to='/fav'>My Favourites</Link> |
                    <Link to='/cart'>My cart</Link> 
                </div>
            </footer>
        </div>
    )
}