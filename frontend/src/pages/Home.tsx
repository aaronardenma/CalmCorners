import Map from "../components/Map";
import Card from "../components/Card";
import {useState} from 'react'
import CardGrid from "../components/CardGrid";

const Home = () => {
    const [locations, setLocations] = useState([])

    const fetchLocations = () => {
        // google api fetch location urls
    }

    return (
        <>
            <div className="App">
                <h2>Locate study spaces that suit your needs!</h2>
            </div>
            <div>
                <Map />
            </div>
            <CardGrid />

        </>
    )
}

export default Home