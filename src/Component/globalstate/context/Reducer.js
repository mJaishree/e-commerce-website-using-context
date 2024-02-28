import Product from './Product.json'

export const initialstate =  //initial state
{
    name : "Product Details",
    arr : Product.tea
}

export const Reducer = (state,action)=>{ //function


        if(action.type === "favourite")
        {
            return {...state, arr : action.payload}
        }

        else if(action.type === "addtocart")
        {
            return {...state,arr : action.payload}
        }
       else if(action.type === "updatePrice")
        {
            return {...state, arr : action.payload}
        }

}