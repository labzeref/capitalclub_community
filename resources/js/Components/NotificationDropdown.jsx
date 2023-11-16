import React from 'react'
import { Head, usePage } from '@inertiajs/react';
import ToastNotification from './ToastNotification';
import { useState } from 'react';
import axios from 'axios';
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from 'react';
import ReactToast from './ReactToast';
import { useEffect } from 'react';
const NotificationDropdown = () => {
  const { toastNotify } = useContext(PostsContext);

    // notifications.index

    const { auth } = usePage().props;
 useEffect(() => {
 

    Echo.private(`App.Models.User.${auth.user.id}`)
        .notification((notification) => {
            // console.log("notification")
            // console.log(notification) 
            ReactToast('success' , notification?.description , notification?.title )
           
            refreshNotificationList()
            // toastNotify(notification)
        })

      }, [])

useEffect(() => {
  refreshNotificationList()
}, [])

        const refreshNotificationList = async () => {
          try {
              const response = await axios.get(route("notifications.index", {limit:5} ));
              // console.log(" getting all notifications successfully:", response.data?.payload);
              setAllNotifications(response.data?.payload)  
          } catch (error) { 
              console.error("Error while getting notifications:", error);
          }
      };


      const [ allNotificatios , setAllNotifications] = useState([])


        // console.log("listner", `App.Models.User.${auth.user.id}`)
  return (
    
    <div className="  p-2 w-[20rem] absolute hidden group-hover:block">
    <div  className="   flex justify-center ml-6  ">


 




<div   className="absolute right-0 mt-2 bg-[#1a1a1a] rounded-md shadow-lg overflow-hidden z-20" style={{width:"20rem"}}>
<div className=" ">
 {allNotificatios?.length > 0 ?  <>
{allNotificatios?.slice(0, 5).map((data, index) => (
  <div className="flex items-center px-4 py-3 border-b border-[#303030] hover:bg-[#292828] -mx-2" key={index}>
    <img className="h-8 w-8 rounded-full object-cover mx-1" src={data?.image} alt="avatar" />
    <div className="mx-2">
      <div className='flex justify-between'>
      <span className="font-bold text-gray-50" href="#">{data?.title}</span>
      <p className="text-white opacity-50 text-xs pt-1">{data?.created_at}</p>
      </div> 
      <p className="text-white opacity-50 text-sm pt-1">{data?.description}</p>
    </div>
  </div>
))}
</>
:
<p className='text-center py-4 opacity-50'>No notification</p>
}


{/* <a href="#" className="flex items-center px-4 py-3 border-b border-[#303030] hover:bg-[#292828] -mx-2">
<img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="avatar"/>
<div className="mx-2"> <span className="font-bold text-gray-50" href="#">Upload Image</span> 
<p className="text-white opacity-50 text-sm ">
Sara Salah  replied on the artical  
</p>
</div>
</a> */}

 
 
</div>
<a href="#" className="block bg-white text-black text-center font-bold py-2">See all notifications</a>
</div>

</div>
</div>
  )
}

export default NotificationDropdown