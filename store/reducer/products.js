import PRODUCTS from "../../data/dummy-data"
const intialState = {
    avaliableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod => prod.ownerId === 'ul'),
}

export default(state = intialState, action) =>{
    return state
}