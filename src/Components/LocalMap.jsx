import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const LocalMap = ({local}) => {
    return (
        <Map
            center={{ lat: local.y, lng: local.x }}
            style={{ width: "100%", height: "360px" }}
        >
            <MapMarker position={{ lat: local.y, lng: local.x }}>
                <div style={{ color: "#000", marginLeft:'34px' }}>{local.place_name}</div>
            </MapMarker>
        </Map>
    )
}

export default LocalMap