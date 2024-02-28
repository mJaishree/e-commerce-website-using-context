// Details.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { globalstate } from "../context/Context";
import { IoHeartOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
//import "./Details.scss";


export const Details = () => {
  const { state, dispatch } = useContext(globalstate);
  const { id } = useParams();
  console.log(id);

  const prod = state.arr.find((item) => item.id === parseInt(id));

  if (!prod) {
    return <div>Product not found</div>;
  }

  const fav = () => {
    let a = state.arr.map((val, ind) =>
      val.id === prod.id ? { ...val, isfav: !val.isfav } : val
    );
    dispatch({ type: "addtocart", payload: a });
  };

  const add = () => {
    let c = state.arr.map((v, ind) =>
      v.id === prod.id ? { ...v, isadd: true } : v
    );
    dispatch({ type: "addtocart", payload: c });
  };

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
  return (
    // <div>
    //   <nav className="navbar">
    //     <Link to="/">
    //       <IoHome />
    //     </Link>
    //     <h1>DETAILED DELIGHTS</h1>
    //     <Link to="/fav">
    //       <IoHeartOutline />
    //     </Link>
    //   </nav>
    //   <div className="details-container">
    //     <div className="details-image">
    //       <img
    //         src={prod.image}
    //         alt={prod.tname}
    //       />
    //     </div>
    //     <div className="details-info">
    //     <p style={{fontSize:"25px",color:"#c7c7c7"}}>Fresho</p>
    //     <hr></hr>
    //       <h1>{prod.fname}</h1>
    //       <h3>{prod.tname}</h3>
    //       <h4>Price : {prod.price}</h4>

    //       <div className="dropdown mt-3" style={{backgroundColor : "#f57777",width:"80px",borderRadius:"5px",textAlign:"center"}} >
    //           <p className="cursor-pointer" onClick={() => drop(prod.id)}>
    //             {prod.kg}
    //           </p>
    //           {prod.isSelect && (
    //             <div className="dropdown-options" style={{backgroundColor:"#f4f4f4"}}>
    //               {prod.weight.map((value, index) => (
    //                 <p
    //                   key={index}
    //                   className="dropOpen"
    //                   onClick={() => handleSelect(value, prod.id, index)}
    //                 >
    //                   {value.kg}
    //                   {/* <span>{value.price}</span> */}
    //                 </p>
    //               ))}
    //             </div>
    //           )}
    //         </div>


    //     <div style={{display:"flex"}}>
    //       <div style={{display:"flex",fontSize: "3em"}} onClick={fav}>
    //         {prod.isfav ? <FcLike /> : <IoHeartOutline />}
    //       </div>

    //       {prod.isadd ? (
    //         <div>
    //           <button onClick={() => minus(1)}> - </button>
    //           <p style={{textAlign:"center"}}> {prod.count} </p>
    //           <button onClick={plus}> + </button>
    //         </div>
    //       ) : (
    //         <button onClick={add}>Add to cart</button>
    //       )}
    //       </div>
    //     </div>
    //   </div>
    //   <footer class="text-center">
    //     <div class="footer-links">
    //       <Link to='/'>Home</Link> |
    //       <Link to='/fav'>My Favourites</Link> |
    //       <Link to='/cart'>My cart</Link> 
    //     </div>
    //   </footer>
    // </div>

    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/">
          <IoHome />
        </Link>
        <h1 className="navbar-brand" style={{color:"#4CAF50"}}>DETAILED</h1>
        <Link to="/fav">
          <IoHeartOutline />
        </Link>
      </nav>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={prod.image} alt={prod.tname} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <p className="text-muted" style={{ fontSize: "25px" }}>
              Fresho
            </p>
            <hr />
            <h1>{prod.fname}</h1>
            <h3 style={{color:"violet"}}>{prod.tname}</h3>
            
            <h4 style={{color:"#4CAF50"}}>Price: <span style={{color:"orange"}}>₹ {prod.price} </span></h4>

            <div className="dropdown mt-3" style={{backgroundColor : "#f57777",width:"80px",borderRadius:"5px",textAlign:"center"}} >
              <p className="cursor-pointer" onClick={() => drop(prod.id)}>
                {prod.kg}
              </p>
              {prod.isSelect && (
                <div className="dropdown-options" style={{backgroundColor:"#f4f4f4"}}>
                  {prod.weight.map((value, index) => (
                    <p
                      key={index}
                      className="dropOpen"
                      onClick={() => handleSelect(value, prod.id, index)}
                    >
                      {value.kg}
                      {/* <span>{value.price}</span> */}
                    </p>
                  ))}
                </div>
              )}
            </div>
           

            <div className="d-flex mt-3">
              <div className="d-flex font-size-3em" style={{fontSize:"30px"}} onClick={() => fav(prod.id)}>
                {prod.isfav ? <FcLike /> : <IoHeartOutline  />}
              </div>

              {prod.isadd ? (
                <div className="ml-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => minus(prod.id, prod.count)}
                  >
                    -
                  </button>
                  <p className="text-center">{prod.count}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => plus(prod.id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary ml-3" onClick={() => add(prod.id)}>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer class="text-center">
        <div class="footer-links">
          <Link to='/'>Home</Link> |
          <Link to='/fav'>My Favourites</Link> |
          <Link to='/cart'>My cart</Link> 
        </div>
      </footer>
    </div>
  );
};




