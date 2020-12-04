import React from 'react';
import './PageContainer.scss';
import {SquireButton} from '../SquireButton/SquireButton'

const PageContainer = (props) => {
    return (
        <div>
            <SquireButton />
            <div className="pageContainer-wrapper">
                {props.children}
            </div>
        </div>
    );
};

export { PageContainer };