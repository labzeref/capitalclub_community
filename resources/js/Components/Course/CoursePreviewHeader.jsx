import { Link } from '@inertiajs/react'
import React from 'react'
import LiveBadge from '../LiveBadge'
import Badge from '../Badge'
import { useState } from 'react'
import { useEffect } from 'react'
import { AsyncImage } from 'loadable-image';
import { Blur } from 'transitions-kit'

const CoursePreviewHeader = ({ className = '', upcomming, live, badge, instructor, user_id, desktop_image, mobile_image, title, courses, category, ...props }) => {

    return (
        <div>
            <div className={className + " large-card-hover-div  bg-cover bg-center relative"}  >
                {/*<div className="hidden md:flex w-100" style={{ height: "auto", width: "100%" }}>*/}
                    <AsyncImage
                        src={desktop_image?.original?.url}
                        className="h-100 w-100 header-image border-rounded-10"
                        style={{ width: "100%", height: "auto", aspectRatio: 1663 / 915 }}
                        Transition={props => <Blur radius={10} {...props}/>}
                        loader={<div style={{ background: '#1A1A1A' }}/>}
                        error={<div style={{ background: '#1A1A1A' }}/>}/>
                {/*</div>*/}
                {/*<div className="flex md:hidden w-100" style={{ height: "auto", width: "100%" }}>*/}
                {/*    <AsyncImage*/}
                {/*        src={mobile_image?.original?.url}*/}
                {/*        className="h-100 w-100 header-image border-rounded-10"*/}
                {/*        style={{ width: "100%", height: "auto", aspectRatio: 343 / 432 }}*/}
                {/*        Transition={props => <Blur radius={10} {...props}/>}*/}
                {/*        loader={<div style={{ background: '#1A1A1A' }}/>}*/}
                {/*        error={<div style={{ background: '#1A1A1A' }}/>}/>*/}
                {/*</div>*/}

            </div>
        </div>
    )
}

export default CoursePreviewHeader
