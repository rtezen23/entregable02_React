import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = () =>{

    const [data, setData] = useState({});

    useEffect(()=>{
        function success(pos){
        var crd = pos.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=b2d5551a787e0a0e9adee56a4d04b6b3`)
        .then(res => setData(res.data));
        };
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`)
        };
        navigator.geolocation.getCurrentPosition(success, error);
    },[]);

    return {data};
};

export default useFetch;
