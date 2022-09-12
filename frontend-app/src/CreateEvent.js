import { useState, useRef, useEffect } from 'react';
import {useJsApiLoader,GoogleMap,Marker,Autocomplete,DirectionsRenderer,} from '@react-google-maps/api'
import usePlacesAutocomplete , {getGeocode,getLatLng,} from "use-places-autocomplete" ;
import { useStatStyles } from '@chakra-ui/react';

const center = { lat: 69, lng: 69 }
const libraries = ['places']
const containerStyle = {width: '400px',height: '400px'};

function BootstrapInput(props) {
    const { id, placeholder, labletext, changeHandler, value, type } =props;
    return(
    <div className="form-group">
        <label className="form-lable">{labletext}</label>
        <input id={id} value = {value} onChange={changeHandler} className="form-control" type={type} placeholder={placeholder} required />
    </div>)
}
function BootstrapInputReadOnly(props) {
    const { id, placeholder, labletext, changeHandler, value, type } =props;
    return(
    <div className="form-group">
        <input readOnly id={id} value = {value} onChange={changeHandler} className="form-control" type={type} placeholder={placeholder} required />
    </div>)
}
function BootstrapInputDate(props) {
    const { id, placeholder, labletext, changeHandler, value, type } =props;
    return(
    <div className="input-group mb-3">
        <input  name="date" id={id} value = {value} onChange={changeHandler} className="form-control" type={type} placeholder={placeholder} />
        <span className="input-group-text">@</span>
        <input type="time" className="form-control" placeholder="Server" aria-label="Server"/>
    </div>
    )
}
function CreateEvent() {
    const API_URL = "http://localhost:8090/events/activities/"
    const EventAPI_URL = "http://localhost:8090/events/"


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:"AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
        libraries
      })

    const[activitys, setActivitys] = useState([]);
    const[name, setName] = useState('');
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');
    const[start, SetStart] = useState('');
    const[end, setEnd] = useState('');
    const[description, setDescription] = useState('');
    const[owner, setOwner] = useState('');
    const[activity, setActivity] = useState('');
    const[picture_url, setPicture_url] = useState('');
    const[map, setMap] = useState(/** @type google.maps.Map */ (null));
    const[selected, setSelected] = useState({});



    useEffect(() => {
        const fetchItems = async () => {
            try{
                const response = await fetch(API_URL);
                const data = await response.json();
                console.log(data)
                setActivitys( Object.values(data));
            } catch (err) {
                console.log(err.stack)
        }
        }
        (async () => await fetchItems())()
    },[])

    function Tester(){
        const oops = Object.values(activitys)
        console.log(activitys)

    }

    /** @type React.MutableRefObject<HTMLInputElement> */
    const markerRef = useRef()

    
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    
    async function Geocode() {
        if (markerRef.current.value === '') {
          return
        }
        console.log(markerRef.current.value)
        const address = markerRef.current.value
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
        map.panTo({ lat, lng });
        map.setZoom(15);
      }
    
      function clearGeocode() {
        markerRef.current.value = ''
      }

      async function onSubmit() {
console.log("iwannacry")
        const data = {
            "name": name,
            "latitude": selected.lat,
            "longitude": selected.lng,
            "start": start,
            "end": end,
            "description": description,
            "owner": owner,
            "activity": activity,
            "picture_url": picture_url
        }
        const doodle = JSON.stringify(data)
        console.log(doodle)
        const response = await fetch(EventAPI_URL, {
          method: "post",
          doodle,
          headers: {
            "Content-Type": "application/json",
          },
        });}

      

console.log(selected)

if (activitys.length !== 0) {
    return (
        <div> 
            <form onSubmit={onSubmit}>
                <h3>Create an event</h3>
                <BootstrapInput 
                    id="Event Name"
                    placeholder="Event Name" 
                    labletext="Event Name" 
                    value={name} 
                    changeHandler={e => setName(e.target.value)}
                    type="event name">
                </BootstrapInput>
                <label className="form-lable">Search addresss</label>
                <div className="input-group mb-3">
                    <Autocomplete>
                    <input type="text" className="form-control" placeholder="Event Address"  ref={markerRef}/>
                    </Autocomplete>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={Geocode} >Search Address</button>
                </div>
                <label className="form-lable">Pleas drag marker to the EXACT location of Your event.</label>
                <div>
                <GoogleMap
                    center={center}
                    mapContainerStyle={containerStyle}
                    zoom={5}
                    onLoad={map => setMap(map)}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}   
                > 
                {selected && <Marker position={selected} draggable={true} onDrag={(event) => {setSelected({lat: event.latLng.lat(), lng: event.latLng.lng()})}}/>}
                 </GoogleMap>
                </div>
                {/* <p>Lat: {selected.lat}</p>
                <p>Lat: {selected.lng}</p> */}
                <BootstrapInputReadOnly 
                    id="latitude"
                    placeholder="latitude" 
                    labletext="latitude" 
                    value={selected.lat} 
                    changeHandler={e => setLatitude(e.target.value)}
                    type="latitude"
                    >
                </BootstrapInputReadOnly><BootstrapInputReadOnly 
                    id="longitude"
                    placeholder="longitude" 
                    labletext="Nalongitudeme" 
                    value={selected.lng} 
                    changeHandler={e => setLongitude(e.target.value)}
                    type="longitude">
                </BootstrapInputReadOnly>
                <label className="form-label">Event start date and time</label>
                <BootstrapInputDate 
                    id="start"
                    placeholder="start Date and time" 
                    labletext="start Date" 
                    value={start} 
                    changeHandler={e => SetStart(e.target.value)}
                    type="date">
                </BootstrapInputDate>
                <label className="form-label">Event end date and time</label>
                <BootstrapInputDate 
                    id="end"
                    placeholder="End Date and Time" 
                    labletext="end" 
                    value={end} 
                    changeHandler={e => setEnd(e.target.value)}
                    type="date">
                </BootstrapInputDate><BootstrapInput 
                    id="description"
                    placeholder="Event description" 
                    labletext="description" 
                    value={description} 
                    changeHandler={e => setDescription(e.target.value)}
                    type="description">
                </BootstrapInput><BootstrapInput 
                    id="owner"
                    placeholder="owner" 
                    labletext="owner" 
                    value={owner} 
                    changeHandler={e => setOwner(e.target.value)}
                    type="owner">
                </BootstrapInput>
                <label className="form-lable">Chose yor activity</label>
                <select className="form-select" id="activitys" aria-label="chose your activity">
                    <option value="">Open this select menu</option>
                    {
                    activitys[0].map((activity) => { return (<option key={(activity)}>{activity.name}</option>)})
                    }
                </select>
                <BootstrapInput 
                    id="picture_url"
                    placeholder="picture_url" 
                    labletext="picture_url" 
                    value={picture_url} 
                    changeHandler={e => setPicture_url(e.target.value)}
                    type="picture_url">
                </BootstrapInput>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
            </form>
            <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={Tester}>Tester</button>
            </div> 
    );}
    else {return <h1> LOADING </h1>}
}

export default CreateEvent