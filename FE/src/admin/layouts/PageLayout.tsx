import { Flowbite } from 'flowbite-react';
import Aside from '../components/Aside';
import Nav from '../components/Nav';
import React from 'react';
import { useState } from 'react';
const PageLayout = ({children}: {children: React.ReactNode}) => {
    const [showState, setShowState] = useState(true);
    return (
        <Flowbite>
            <div className='container max-w-full bg-gray-50 dark:bg-gray-800 h-[100%]'>
            <Nav showState={showState} setShowState={setShowState}/>    
            <Aside showState={showState}/>
            {children}
            </div>
        </Flowbite>
    )
}

export default PageLayout