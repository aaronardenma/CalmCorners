import React from 'react'
import Card from './Card'

function CardGrid() {

    return (
        <div className='mt-4 justify-items-center font-bold'>
            <h1 >Check out our Featured Spots!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                <Card imagePath='' imageDescription='hello!' imageTitle='HELLO!' />
                <Card imagePath='' imageDescription='hello!' imageTitle='HELLO!' />
                <Card imagePath='' imageDescription='hello!' imageTitle='HELLO!' />
                <Card imagePath='' imageDescription='hello!' imageTitle='HELLO!' />
            </div>
        </ div>
        
    )
}

export default CardGrid