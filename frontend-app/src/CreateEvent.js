import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete"
import googleAPI from './keys'

const center = { lat: 37.7749295, lng: -122.4194155 }
const libraries = ['places']

function BootstrapInput(props) {
    const { id, placeholder, changeHandler, value, type, label } = props;
    return (
        <div className="form-group form-floating">
            <input
                id={id}
                value={value}
                onChange={changeHandler}
                className="form-control"
                type={type}
                placeholder={placeholder}
                label={label}
                required
            />
            <label htmlFor="floatingInputGrid">{label}</label>
        </div>)
}

function BootstrapInputDate(props) {
    const { id, placeholder, changeHandler, value, type, label, changehandler2 } = props;
    return (
        <div className="input-group mb-3">
            <input
                name="date" id={id}
                value={value} onChange={changeHandler}
                className="form-control"
                type={type}
                placeholder={placeholder}
                label={label}
            />
            <input
                type="time"
                className="form-control"
                placeholder="Server"
                aria-label="Server"
                onChange={changehandler2}
                label={label}
            />
        </div>
    )
}
function CreateEvent() {
    const API_URL = `${process.env.REACT_APP_EVENTS}/events/activities/`
    const EventAPI_URL = `${process.env.REACT_APP_EVENTS}/events/`
    const containerStyle = { width: '400px', height: '400px' }
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleAPI(),
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
    const [selected, setSelected] = useState({ lat: 37.7749295, lng: -122.4194155 });
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
            const response = await fetch(url, { credentials: "include" });
            if (response.ok) {
                const userData = await response.json()
                console.log(userData)
                setUserId(userData)
            }
        }
        getUserdata()

    }, [])

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
        const url = `${process.env.REACT_APP_EVENTS}/events/`;
        const content = JSON.stringify(data)
        console.log(content)
        const response = await fetch(url, {
            method: "post",
            body: content,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }



    console.log(selected)

    if (activitys.length !== 0) {
        return (
            <div className="container px-4 py-4">
                <div className="row gx-5">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card body px-4 py-4">
                                <div className='m-3'>
                                    <h2 align="center">Create An Event</h2>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <BootstrapInput
                                        id="Event Name"
                                        placeholder="Event Name"
                                        value={name}
                                        changeHandler={e => setName(e.target.value)}
                                        type="text"
                                        label='Event Name'
                                    >
                                    </BootstrapInput>
                                    <div className="input-group mb-3 mt-3">
                                        <Autocomplete>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Event Address"
                                                label='Event Address'
                                                ref={markerRef} />
                                        </Autocomplete>
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            id="searchAddress"
                                            onClick={Geocode}>
                                            Search Address
                                        </button>
                                    </div>
                                    <label className="form-label ">Pin Your Event Location</label>
                                    <div className='mb-3'>
                                        <GoogleMap
                                            center={center}
                                            mapContainerStyle={containerStyle}
                                            zoom={5}
                                            onLoad={map => setMap(map)}
                                            options={{
                                                streetViewControl: false,
                                                mapTypeControl: false,
                                                fullscreenControl: false,
                                            }}>
                                            {selected && <Marker position={selected} draggable={true} onDrag={(event) => { setSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() }) }} />}
                                        </GoogleMap>
                                    </div>
                                    <label className="form-label">Event Start</label>
                                    <BootstrapInputDate
                                        id="start"
                                        placeholder="Start Date and Time"
                                        value={start}
                                        changehandler2={e => setStartTime(e.target.value)}
                                        changeHandler={e => SetStart(e.target.value)}
                                        label='Event Start'
                                        type="date">
                                    </BootstrapInputDate>
                                    <label className="form-label">Event End</label>
                                    <BootstrapInputDate
                                        id="end"
                                        placeholder="End Date and Time"
                                        value={end}
                                        changeHandler={e => setEnd(e.target.value)}
                                        changehandler2={e => setEndTime(e.target.value)}
                                        label='Event End'
                                        type="date">
                                    </BootstrapInputDate>

                                    <BootstrapInput
                                        id="description"
                                        placeholder="Event Description"
                                        value={description}
                                        changeHandler={e => setDescription(e.target.value)}
                                        label='Description'
                                        type="text">
                                    </BootstrapInput>
                                    <div className='form-floating mt-3 mb-3'>
                                        <select
                                            className="form-select"
                                            id="activitys"
                                            aria-label="Choose your activity"
                                            onChange={e => setActivity(e.target.value)}>
                                            <option value="">Choose Your Activity</option>
                                            {
                                                activitys[0].map((activity) => { return (<option onSelect={e => setActivity(activity.id)} value={activity.id} key={(activity.id)}>{activity.name}</option>) })
                                            }
                                        </select>
                                        <label for="floatingSelectGrid">Activity</label>
                                    </div>

                                    <BootstrapInput
                                        id="picture_url"
                                        placeholder="Picture URL"
                                        value={picture_url}
                                        changeHandler={e => setPicture_url(e.target.value)}
                                        type="picture_url"
                                        label='Picture URL'
                                    >

                                    </BootstrapInput>
                                    <div className='m-3' align="center">
                                        <button
                                            type="submit"
                                            className="btn btn-dark btn-block">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else { return <h1> LOADING </h1> }
}

export default CreateEvent