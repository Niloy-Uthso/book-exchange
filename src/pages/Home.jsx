import React from 'react';
import Banner from '../components/Banner';
import HomeBooksSection from '../components/HomeBooksSection';
import HowItWorks from '../components/HowItWorks Section';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeBooksSection></HomeBooksSection>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;