import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow
  } from "react-google-maps";
import { Cacher } from '../../services/cacher';
  

export const MapComponent = props => {

  const { coordinates, isError, isLocationLoaded } = props;

  return(
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{disableDefaultUI: isError ? true : false }}
    >
      {isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}

      {isLocationLoaded && isError && <InfoWindow position={coordinates} options={{maxWidth: 300}}>
        <div>
          lakmklzm lm,r ml,ezml, lez,l,l,ml,mnljzegkge 
          knekzrhnkl enezrnlknlkzner 
          mklzekrj zekrlkeznrlkezrlzekrzelkrjek
        </div>
      </InfoWindow>}

    </GoogleMap>    
  )
}

function withGeocode(WrappedComponent) {

  return class extends React.Component {

    constructor(props) {
      super(props);

      this.cacher = new Cacher();

      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      }
    }

    componentWillMount() {
      this.getGeocodedLocation();
    }

    updateCoordinates(coordinates) {
      this.setState({coordinates: coordinates, isLocationLoaded: true});
    }

    geocodeLocation(location) {

      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {

        geocoder.geocode({address: location}, (result, status) => {
        
          if (status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = {
              lat: geometry.lat(),
              lng: geometry.lng()
            }

            this.cacher.cacheValue(location, coordinates);

            resolve(coordinates);
          
          } else {
            reject('ERRORRRR');
          }
        });
      });
    }

    getGeocodedLocation() {

      const { location } = this.props;

      if (this.cacher.isValueCached(location)) {

        this.updateCoordinates(this.cacher.getCacheValue(location));

      } else {

        this.geocodeLocation(location).then(
          (coordinates) => {
            this.updateCoordinates(coordinates);
          },
          (error) => {
            this.setState({
              isError: true,
              isLocationLoaded: true
            });
          }
        );
      }
    }

    render() {
      
      return(
          <WrappedComponent {...this.state} />
      )
    }
  }
}

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));