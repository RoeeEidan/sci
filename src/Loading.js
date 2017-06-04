import React from 'react';
import { Spinner } from 'react-mdl';

const Loading = () => (
    <div className='Loading'>
        <div className="loadingText">
            Loading
        </div>
        <Spinner singleColor/>
    </div>
)

export default Loading;