import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [
                {
                     name: "Current position",
                     position: {
                         lat: '24.914161699999998',
                         lng: '67.082216'
                    }
                }
            ]

        }
    }

    onMarkerDragEnd =  (coord, index) => {
        const { latLng } = coord;
         const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index],  position: { lat, lng } };
             return { markers };
        });
    }

    getLocation =  () => {
        if (navigator && navigator. geolocation) {
            navigator. geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;

                let newState = Object.assign({}, this.state);
                newState. markers[0].position.lat = coords.latitude;
                newState. markers[0].position.lng = coords.longitude;

                this.setState(newState);
                 console.log("map", this.state.markers[0].position.lat, this.state.markers[0].position.lng)
            });
        }
    }

     componentDidMount() {
        this.getLocation()
    }

    handleSubmit =  async e => {
        e.preventDefault();

        const location = {
             latitude: this.state.markers[0].position.lat,
            longitude: this.state.markers[0].position.lng
        }

    }

     render() {
        return (

            <div>
                <Map
                     google={this.props.google}
                     style={{
                         width: "100%",
                         height: "300px"
                    }}
                     zoom={14}
                     initialCenter={{ lat: this.state.markers[0].position.lat, lng: this.state.markers[0].position.lng }}
                > 
                    {this.state.markers.map((marker, index) => (
                         <Marker
                             key={index}
                             position={marker.position}
                             draggable={true}
                             onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                            name={marker.name}
                        />
                    ))}
                 </Map>
                <button type="submit" onClick={this.handleSubmit} >submit</button>
            </div>
        );
    }
}

 export default GoogleApiWrapper({
    apiKey: 'google api key here' 
})(Maps);