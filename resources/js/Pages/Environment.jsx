
// import Button from '@/Components/Button';
import React, { useEffect, useState, useMemo } from "react";
import Button from '../Components/Button'
import Layout from '../Layouts/Layout';


import {ReactComponent as ContinueIcon} from "../../assets/svg/countinuebtn.svg";

const Environment = () => {
    return (
        <div className={'m-[50px]'}>
            <h1 className={'glitch'}>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <p className={'fw-bold glitch-text'}>Bold</p>
            <p className={'fw-semi-bold'}>Semi-Bold</p>
            <p className={'fw-medium'}>Medium</p>
            <p>Regular</p>

            <p className={'fs-x-large'}>X-Large</p>
            <p className={'fs-large'}>Large</p>
            <p className={'fs-medium'}>Medium</p>
            <p className={'fs-small'}>Small</p>
            <p className={'fs-tiny'}>Tiny</p>



            <Button className={'secondary icon mt-[50px]'} icon={<ContinueIcon/>}>
                Icon Button
            </Button>

            <Button className={'primary icon mt-[50px]'} icon={<ContinueIcon/>}>
                Primary Button
            </Button>
            <Button className={'primary mt-[50px]'}>
                Primary Button
            </Button>

        </div>
    );
}



Environment.layout = page => <Layout children={page} title="Welcome" />

export default Environment;
