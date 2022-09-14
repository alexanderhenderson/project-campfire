import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";

function BootstrapInput(props) {
    const { id, placeholder, labeltext, changeHandler, value, type } = props;
    return (
        <div className="form-group">
            <label className="form-label">{labeltext}</label>
            <input id={id} value={value} onChange={changeHandler} className="form-control" type={type} placeholder={placeholder} required />
        </div>)
}

function BootstrapInputDate(props) {
    const { id, placeholder, labeltext, changeHandler, value, type, changehandler2 } = props;
    return (
        <div className="input-group mb-3">
            <input name="date" id={id} value={value} onChange={changeHandler} className="form-control" type={type} placeholder={placeholder} />
            <span className="input-group-text">@</span>
            <input type="time" className="form-control" placeholder="Server" aria-label="Server" onChange={changehandler2} />
        </div>
    )
}
function CreateEvent() {
    const API_URL = "http://localhost:8090/events/activities/"
    const EventAPI_URL = "http://localhost:8090/events/"

    const center = { lat: 37.7749295, lng: -122.4194155 }
    const libraries = ['places']
    const containerStyle = { width: '400px', height: '400px' }


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyD4Q4PCT3p96MNZkKiWkzikGfQYioFeDek",
        libraries
    })

    const [activitys, setActivitys] = useState([]);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [start, SetStart] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState(0);
    const [activity, setActivity] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [map, setMap] = useState(/** @type google.maps.Map */(null));
    const [selected, setSelected] = useState({});
    const [userData, setUserId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");



    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                console.log(data)
                setActivitys(Object.values(data));
            } catch (err) {
                console.log(err.stack)
            }
        }
        fetchItems()


        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
            console.log("sendhelp")
            const response = await fetch(url, { credentials: "include" });
            if (response.ok) {
                console.log("67")
                const userData = await response.json()
                console.log(userData)
                setUserId(userData)
            }
        }
        getUserdata()

    }, [])


    function Tester() {
        const oops = Object.values(activitys)
        console.log(activitys)
        console.log(userData)

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
        map.setZoom(20);
    }


    async function onSubmit(e) {
        e.preventDefault()
        console.log("iwannacry")
        const data = {
            "name": name,
            "latitude": selected.lat.toString(),
            "longitude": selected.lng.toString(),
            "start": start + 'T' + startTime + ':00+00:00',
            "end": end + 'T' + endTime + ':00+00:00',
            "description": description,
            "owner": userData.id,
            "activity": Number(Array.from(activity)[0]),
            "picture_url": picture_url
        }
        console.log(data)
        const url = "http://localhost:8090/events/";
        const doodle = JSON.stringify(data)
        console.log(doodle)
        const response = await fetch(url, {
            method: "post",
            body: doodle,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }



    console.log(selected)

    if (activitys.length !== 0) {
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <h3>Create an event</h3>
                    <BootstrapInput
                        id="Event Name"
                        placeholder="Event Name"
                        labeltext="Event Name"
                        value={name}
                        changeHandler={e => setName(e.target.value)}
                        type="event name">
                    </BootstrapInput>
                    <label className="form-label">Search address</label>
                    <div className="input-group mb-3">
                        <Autocomplete>
                            <input type="text" className="form-control" placeholder="Event Address" ref={markerRef} />
                        </Autocomplete>
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={Geocode} >Search Address</button>
                    </div>
                    <label className="form-label">Drop a pin on your event location.</label>
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
                            {selected && <Marker position={selected} draggable={true} onDrag={(event) => { setSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() }) }} />}
                        </GoogleMap>
                    </div>
                    <label className="form-label">Event Start</label>
                    <BootstrapInputDate
                        id="start"
                        placeholder="Start Date and time"
                        labeltext="start Date"
                        value={start}
                        changehandler2={e => setStartTime(e.target.value)}
                        changeHandler={e => SetStart(e.target.value)}
                        type="date">
                    </BootstrapInputDate>
                    <label className="form-label">Event End</label>
                    <BootstrapInputDate
                        id="end"
                        placeholder="End Date and Time"
                        labeltext="end"
                        value={end}
                        changeHandler={e => setEnd(e.target.value)}
                        changehandler2={e => setEndTime(e.target.value)}
                        type="date">
                    </BootstrapInputDate>
                    <BootstrapInput
                        id="description"
                        placeholder="Event description"
                        labeltext="Description"
                        value={description}
                        changeHandler={e => setDescription(e.target.value)}
                        type="description">
                    </BootstrapInput>
                    <label className="form-label">Choose Your Activity</label>
                    <select className="form-select" id="activitys" aria-label="Choose your activity" onChange={e => setActivity(e.target.value)} >
                        <option value="">Choose Your Activity</option>
                        {
                            activitys[0].map((activity) => { return (<option onSelect={e => setActivity(activity.id)} key={(activity.id)}>{activity.id}:{activity.name}</option>) })
                        }
                    </select>
                    <BootstrapInput
                        id="picture_url"
                        placeholder="Picture URL"
                        labeltext="Picture URL"
                        value={picture_url}
                        changeHandler={e => setPicture_url(e.target.value)}
                        type="picture_url">
                    </BootstrapInput>
                    <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
                </form>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={Tester}>Tester</button>
            </div>
        );
    }
    else { return <h1> LOADING </h1> }
}

export default CreateEvent