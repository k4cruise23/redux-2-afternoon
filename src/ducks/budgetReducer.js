import axios from 'axios'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const DELETE_PURCHASE = 'DELETE_PURCHASE'

export const requestBudgetData = () => {
    const data = axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export const addPurchase = (price, description, category) => {
    const data = axios.post('/api/budget-data/purchase', {price, description, category}).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) => {
    const data = axios.delete(`/api/budget-data/purchase/${id}`, ).then(res => res.data)
    return {
        type: DELETE_PURCHASE,
        payload: data
    }
    
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case DELETE_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case DELETE_PURCHASE + 'FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false}
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, ...action.payload, loading: false}
        default: return state
    }
}

export default reducer
