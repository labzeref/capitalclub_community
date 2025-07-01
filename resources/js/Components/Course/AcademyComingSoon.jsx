import { Link } from '@inertiajs/react'
import React from 'react'
import LiveBadge from '../LiveBadge'
import Badge from '../Badge'
import { useState } from 'react'
import { useEffect } from 'react'

import placeholderImg from '../../../scss/components/coursePlaceholder.svg'
import PlayIcon from '../PlayIcon'
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

const AcademyComingSoon = ({ className = '', lazyLoad = false, data, ...props }) => {


    return (
        <div>
            <div className={className + "coming-soon-linear  large-card-hover-div object-cover  relative   "}  >

                <div className="hidden md:flex w-100" style={{ height: "auto", width: "100%" }}>
                    {!lazyLoad ?
                        <AsyncImage
                            src={data?.mobile_thumbnail?.original?.url}
                            className={'w-100 header-image border-rounded-10'}
                            style={{ height: "auto", width: "100%", aspectRatio: 343 / 432, objectFit: "contain" }}
                            // Transition={props => <Blur radius={10} {...props}/>}
                            loader={<div style={{ background: '#1A1A1A' }} />}
                            error={<div style={{ background: '#1A1A1A' }} />} />
                        :
                        <img src={desktop_image?.original?.url} className={'w-100 header-image border-rounded-10'} />
                    }
                </div>
                <div className="flex md:hidden w-100" style={{ height: "auto", width: "100%" }}>
                    {!lazyLoad ?
                        <AsyncImage
                            src={data?.mobile_thumbnail?.original?.url}
                            className="h-100 w-100 header-image border-rounded-10"
                            style={{ width: "100%", height: "auto", aspectRatio: 343 / 432, objectFit: "contain" }}
                            // Transition={props => <Blur radius={10} {...props}/>}
                            loader={<div style={{ background: '#1A1A1A' }} />}
                            error={<div style={{ background: '#1A1A1A' }} />} /> :
                        <img src={mobile_image?.original?.url} className="h-100 w-100 header-image border-rounded-10" />}
                </div>

            </div>
        </div>
    )
}

export default AcademyComingSoon
