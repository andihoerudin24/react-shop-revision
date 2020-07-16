import { ADD_ORDER } from "../actions/orders"
import Order from "../../models/order"

const intialState = {
    orders:[]
}

export default (state = intialState,action) =>{
    switch(action.type){
       case ADD_ORDER:
           const newOrder = new Order(
               new Date().toString(),
               action.orderData.items,
               action.orderData.amount,
               new Date()
           )
           console.log({
               ...state,
               orders:state.orders.concat(newOrder)
           })
    }  
    return state
}