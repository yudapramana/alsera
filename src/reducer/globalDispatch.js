import axios from 'axios';
import storeRedux from './globalStore';

export const loading = () => {
    return{ type: "LOADING" }
}

export const getLocationAsync = (val) => {
    return { type: "FETCH_LOCATION", value: val };
} 

const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export const getLocation = () => {
    return dispatch => {
        dispatch(loading());

        getPosition()
        .then((position) => {
            dispatch(getLocationAsync(position.coords));
        })
        .catch((err) => {
            console.log(err);
            dispatch(getLocationAsync(err));
        });
    }
}

const getOutletAsync = (val) => {
    return { type: "FETCH_OUTLET", value: val };
}


const fetchOutlet = () => {
    console.log('RUN GETOUTLET');
    return new Promise((resolve, reject) =>{
        let gState = storeRedux.getState();
        let coords = gState.coordinate.latitude + ',' + gState.coordinate.longitude;
        console.log(coords);
        axios.get('http://customer.kliknklin.co/api/onradius/nearbies/'+coords)
            .then((result) => {
                resolve(result.data);
            }, (err) => {
                reject(err);
            })
    })
}

export const getOutlet = () => {
    return dispatch => {
        dispatch(loading());
        console.log('Dispatch GETOUTLET');
        fetchOutlet()
        .then((result) => {
            console.log(result.data);
            dispatch(getOutletAsync(result.data));
        }, (err) => {
            dispatch(getOutletAsync(err));
        })
    }
}

const ActionCollection = {
    getLocation,
    getOutlet,
}

export default ActionCollection;