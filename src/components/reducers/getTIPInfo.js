// actions
const GET_TIP = 'GET_TIP'

// action creators
const get_tip = project => ({type: GET_TIP, project})

// reducers
export default function tipReducer(info = [], action){
    switch(action.type){
        case GET_TIP:
            return action.tip || []
        default:
            return 'HIT THE REDUCER'
    }
}

// dispatchers
/*export const getTIP = projects => dispatch => {
    
}*/