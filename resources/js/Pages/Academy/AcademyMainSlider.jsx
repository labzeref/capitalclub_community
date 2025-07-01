import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import SlideArrows from '@/Components/SlideArrows';
import AcademySmallSliderCard from '@/Components/Course/AcademySmallSliderCard';
import Fade from 'embla-carousel-fade'
const AcademyMainSlider = ({ data }) => {



    const [FeatureRef, FeatureApi] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        duration: 1,
    }, [Fade()]);
    const featurePrev = useCallback(() => FeatureApi && FeatureApi.scrollPrev(), [FeatureApi]);
    const featureNext = useCallback(() => FeatureApi && FeatureApi.scrollNext(), [FeatureApi]);

    const scrollTo = useCallback((index) => FeatureApi && FeatureApi.scrollTo(index), [FeatureApi]);


    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);


    const onSelect = useCallback(() => {
        if (!FeatureApi) return;
        setSelectedIndex(FeatureApi.selectedScrollSnap());

    }, [FeatureApi]);


    useEffect(() => {
        if (!FeatureApi) return;
        onSelect();
        setScrollSnaps(FeatureApi.scrollSnapList());
        FeatureApi.on('select', onSelect);
        FeatureApi.on('reInit', onSelect);
    }, [FeatureApi, onSelect]);
    return (
        <div className="grid grid-cols-12 relative h-full w-full  ">
            <div className="col-span-12">


                <div className="embla">
                    {/* <div className="marquee-shadow left "></div>
                    <div className="marquee-shadow right -top-[1px]"></div> */}
                    <div className="embla__viewport" ref={FeatureRef}>
                        <div className="embla__container">
                            {data.map((data, index) => (
                                <div className="embla__slide embla__main-slide main-slider" key={index}>
                                    <AcademySmallSliderCard
                                        IsMoneyTalk={false}
                                        imgHeight={'  rounded-[10px]'}
                                        title={data?.title}
                                        summery={data?.summery}
                                        desktop_image={data?.thumbnail}
                                        mobile_image={data?.mobile_thumbnail}
                                        isNew={data?.is_new}
                                        routeToPlay={route('courses.preview', {
                                            course: data?.id,
                                        })}
                                        lessonProgress={data?.duration_watched}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
                                onClick={() => { scrollTo(index); setSelectedIndex(index) }}
                            > </button>
                        ))}
                    </div>
                </div>



                {/* <OwlCarousel {...owlOptions?.options}
                ref={mainRef}
                className="owl-theme relative">
                {featuredCourses?.map((data, index) => (
                    <React.Fragment key={data?.id}>

                        <AcademyLargeCard
                            className={"academy-large-card feature-card"}
                            lazyLoad={false}
                            title={data?.title}
                            instructor={data?.default_instructor?.full_name}
                            duration={"5 hr 40 min"}
                            lessons={data?.lessons_count}
                            desktop_image={data?.thumbnail}
                            mobile_image={data?.mobile_thumbnail}
                            badge={"primary"}
                            badge_text={""}
                            live={false}
                            routeToPlay={route('courses.preview', { course: data?.id })}
                            isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                            isLockedIcon={isLock}
                            videoProgress={0} />
                    </React.Fragment>
                ))}
            </OwlCarousel> */}
            </div>

            <div className="hidden lg:block">
                <div className="absolute mx-auto academy-arrow px-5 z-[1] ">
                    <button className="flex items-center justify-center cursor-pointer" onClick={featurePrev}>
                        <SlideArrows />

                    </button>
                </div>
                <div className="absolute mx-auto right-1  academy-arrow px-5 z-[1] cursor-pointer ">
                    <button className="rotate-180 flex items-center justify-center" onClick={featureNext}>
                        <SlideArrows />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AcademyMainSlider
