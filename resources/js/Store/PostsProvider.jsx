import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { remove } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [contextPosts, setContextPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [CourseId, setCourseId] = useState();

  const [contextNotify, setContextNotifiy] = useState({});

  const toastNotify = (e) => {
    setContextNotifiy(e)
  }

  const [studymode, setStudyMode] = useState(false);

  const [userData, setUserData] = useState([]);

  const [scrollToNotes, setScrollToNotes] = useState(false);

  const [studyMoodOn, setStudyMoodOn] = useState(false)

  const [isPlayPage, setIsPlayPage] = useState(false)

  const [featuredLiveStream, setFeaturedLiveStream] = useState();


  useEffect(() => {
    window.addEventListener('beforeunload', function () {
      localStorage.removeItem("academyLoaded");
      // console.log(' academy loaded removed')
    });
  }, [])


  useEffect(() => {
    if (currentPage != 'play') {
      setStudyMode(false)
    }
  }, [currentPage])

  const toggleStudyMode = () => {
    setStudyMode(!studymode);
  };

  return (
    <PostsContext.Provider value={{ featuredLiveStream, setFeaturedLiveStream, isPlayPage, setIsPlayPage, scrollToNotes, setScrollToNotes, studymode, studyMoodOn, setStudyMoodOn, toggleStudyMode, setCourseId, CourseId, toastNotify, contextNotify, contextPosts, setCurrentPage }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };
