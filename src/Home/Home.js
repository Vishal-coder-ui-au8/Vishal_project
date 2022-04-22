import React from 'react';
import Search from './Search';
import QuickApi from './QuickApi';
import Header from '../Header';

const Home = () => {
    return(
        <>
        <Header/>
        <Search/>
        <QuickApi/>   
        </>
    )
}

export default Home;