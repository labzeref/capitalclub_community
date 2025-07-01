import LessonLayout from '@/Layouts/LessonLayout';
import { GTMLogs } from '@/utils/GTMLogs';
import React from 'react'
import { useEffect } from 'react';

const MarketplaceProfileRedeem = ({ partnerProfile }) => {
    useEffect(() => {
        GTMLogs({
            'event': 'GTMevent',
            'event_name': 'marketplace_external_url',
            'event_id': '10021',
        })
    }, [])
    return (
        <div style={{ width: '100vw', height: '88vh', overflow: 'hidden' }}>

            <div data-tf-live='01HQN2APB952K07V0CKAXFJ5V0'></div>


        </div>
    )
}


MarketplaceProfileRedeem.layout = (page) => <LessonLayout children={page} title="" />;

export default MarketplaceProfileRedeem
