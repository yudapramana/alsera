import ActionType from './globalActionType'

const globalState = {
    loading: false,
    error: false,
    coordinate: {
        latitude: 0,
        longitude: 0,
    },
    zoom: 18,
    locationflag: false,
    outlets: [],
    modalShow: false,
};
  
// Reducer
const rootReducer = (state = globalState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case ActionType.FETCH_LOCATION:
            console.log('FETCH_LOCATION');
            if(typeof action.value.latitude !== 'undefined'){
                newState.coordinate.latitude = action.value.latitude;
                newState.coordinate.longitude = action.value.longitude;
                newState.locationflag = true;
            } else {
                newState.error = true;                
            }
            newState.loading = false;
            break;
        case ActionType.LOADING:
            newState.loading = true;
            console.log('LOADING');
            break;
        case ActionType.FETCH_OUTLET:
            console.log('FETCH_OUTLET');
            newState.outlets = action.value;
            newState.loading = false;
            newState.modalShow = false;
            break;
        case ActionType.FIND_LOCATION:
            console.log('FIND_LOCATION');
            newState.coordinate.latitude = action.value1;
            newState.coordinate.longitude = action.value2;
            newState.loading = false;
            break;
        case ActionType.TOGGLE_MODAL:
            console.log('TOGGLE_MODAL');
            newState.modalShow = action.value;
            newState.loading = false;
            break;
        default:
            return state;
    }
    console.log(newState);
    return newState;
}

export default rootReducer;