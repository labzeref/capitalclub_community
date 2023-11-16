import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [contextPosts, setContextPosts] = useState([]); 
  const [currentPage , setCurrentPage] = useState();
  
  const [contextNotify, setContextNotifiy] = useState({});

//  console.log('current page is in context :' , currentPage )




    // all posts  
    const getAllPost =async()=>{
      if (currentPage=='discussion') {
        
        try {
          const response = await axios.get(route("posts.index"));
          setContextPosts(response?.data?.payload?.data)
          // console.log('getting in context all post successfully.....', response?.data?.payload?.data)
        } catch (error) {
          console.error("error in context getting all  post:", error);
        }
      }
      } 

  useEffect(() => {
getAllPost()  
  }, [currentPage]);

  // Function to update the posts state
  const updatePosts = (newPosts) => { 
    setContextPosts(newPosts);
  };

// *** following posts ***

  const getFollowingPost = async () => {
    try {
        const response = await axios.get(route("posts.index",{ following:true }));
        // setPosts(response?.data?.payload?.data)
        setContextPosts(response?.data?.payload?.data)
        // setLoader(false)
        // updatePosts(response?.data?.payload?.data)
        // console.log('getting all post successfully. ....', response?.data?.payload?.data)
    } catch (error) {
        console.error("error getting all  post:", error);
    }
};

// ***bookmark posts ***
const getBookmarkPost = async () => {
  try {
      const response = await axios.get(route("posts.index", { bookmarked:true })); 
      setContextPosts(response?.data?.payload?.data) 
  } catch (error) {
      console.error("error getting all  post:", error);
  }
};


// **** Post Emoji Reaction ****  

const [selectedEmojis, setSelectedEmojis] = useState({});
const handleEmojiClick = async (emoji, postId, index) => {
    try {
        const response = await axios.post(route('toggle-reaction.posts', postId), {
            reaction: emoji?.name,
        });
        // console.log('Emoji posted successfully:', response.data);
        setContextPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index] = response.data?.payload;
            return updatedPosts;
        });
    } catch (error) {
        console.error('Error while emoji API hitting:', error);
    }

    setSelectedEmojis((prevSelectedEmojis) => ({
        ...prevSelectedEmojis,
        [postId]: emoji,
    }));
};









const toastNotify =(e)=>{ 
setContextNotifiy(e)
} 


  return (
    <PostsContext.Provider value={{ toastNotify , contextNotify, contextPosts , updatePosts , setCurrentPage , handleEmojiClick ,getAllPost,   getFollowingPost , getBookmarkPost  }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };
