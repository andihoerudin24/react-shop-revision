export const ADD_ORDER = 'ADD_ORDER'


export const addOrder = (cartItem,totalAmount)=>{
   //console.log('cart',cartItem)
    return{
        type:ADD_ORDER,
        orderData:{
            items:cartItem,
            amount:totalAmount
        }
    }
}