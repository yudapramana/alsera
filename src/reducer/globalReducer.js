import ActionType from './globalActionType'

const globalState = {
    loading: false,
    error: false,
    locationflag: false,
    outlets: [],
    modalShow: false,
    mapOptions: {
        center: {
          lat: -6.1757359,
          lng: 106.824877
        },
        zoom: 15,
        styles: [],
        layerTypes: [],
        apiKey: 'AIzaSyBjH7P71pXC5ceqza_ysznun7AjFSeLYtM',
    }
};
  
// Reducer
const rootReducer = (state = globalState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case ActionType.FETCH_LOCATION:
            console.log('FETCH_LOCATION');
            if(typeof action.value.latitude !== 'undefined'){
                newState.mapOptions.center.lat = action.value.latitude;
                newState.mapOptions.center.lng = action.value.longitude;
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
            newState.locationflag = true;
            newState.loading = false;
            newState.modalShow = false;
            break;
        case ActionType.SET_LOCATION:
            console.log('SET_LOCATION');
            newState.mapOptions.center.lat = action.value1;
            newState.mapOptions.center.lng = action.value2;
            newState.loading = false;
            break;
        case ActionType.TOGGLE_MODAL:
            console.log('TOGGLE_MODAL');
            newState.modalShow = action.value;
            newState.loading = false;
            break;
        case ActionType.SET_MAP_CENTER:
            console.log('SET_MAP_CENTER');
            console.log(action.center.lat);
            console.log(action.center.lng);
            newState.mapOptions.center.lat = action.center.lat;
            newState.mapOptions.center.lng = action.center.lng;
            break;
        default:
            return state;
    }
    console.log(newState);
    return newState;
}

export default rootReducer;