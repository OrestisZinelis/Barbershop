import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './SquireButton.scss';

const SquireButton = () => {
    return (
        <Link className="squire-button" to="/">X-CUTZ</Link>
    );
};

export { SquireButton };