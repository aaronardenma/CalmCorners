import React from 'react'
import {useState} from 'react'
import Dropdown from '../components/Dropdown';
import {useNavigate} from 'react-router-dom'

const SubmitReview = () => {
    // const [name, setName] = useState('');
    // const [textReview, setTextReview] = useState('');
    // const [noiseLevel, setNoiseLevel] = useState(-1);
    // const [busyLevel, setBusyLevel] = useState(-1);
    // const [location, setLocation] = useState('')
    // const [weather, setWeather] = useState('')

    // const navigate = useNavigate();

    // const handleBackClick = () => {
    //     navigate("/review");
    // };

    return (
        <>
            <div className='flex items-center flex-col '>
                <h1>Submit a Review!</h1>
                <form className='flex flex-col justify-center'>
                    <div className='space-x-2'>
                        <label >Noise Level</label>
                        <input type="number" name="noiseLevel" className='mx-2 border-black rounded-sm border-1' />
                    </div>
                    <div className='space-x-2'>
                        <label>How busy is it?</label>
                        <input type="number" name="busyLevel" className='mx-2 border-black rounded-sm border-1' />
                    </div>
                </form>
                <Dropdown menuName = {'Location'} menuItems = {['first', 'second']} />
            </div>
        </>
    )

}

export default SubmitReview