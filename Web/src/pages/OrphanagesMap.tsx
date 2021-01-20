import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

interface Orphanage {
    id: number
    name: string
    latitude: number
    longitude: number
}

function OrphanagesMap() {
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa.</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Bagé</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>

            <Map 
                center={[-31.3285,-54.1073]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxtZWlkYTEyMDQiLCJhIjoiY2trNThxcGgxMWwzNjJycGp5ZHE1YjltcCJ9.GMkUcy7vWOHxHkwLq380Xg`} />

                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            position={[ orphanage.latitude, orphanage.longitude ]}
                            icon={mapIcon}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={32} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap