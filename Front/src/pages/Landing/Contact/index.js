import React from 'react';
import Header from '../LandingHome/Header';
import Footer from '../LandingHome/Footer';
import './contact.css';

const Team = () => {
    return (
        <div>
            <div className="contactContainer">
                <Header style={{ zIndex: '2' }} />
            </div>
            <Footer/>
        </div>
    );
};

export default Team;
