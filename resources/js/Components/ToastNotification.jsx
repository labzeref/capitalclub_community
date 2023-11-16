import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from 'react';

const ToastNotification = ({notification}) => {
  const { contextNotify } = useContext(PostsContext);
  useEffect(() => {
    //  console.log("notificatoin in   toast notificatoin from context ****" , contextNotify)
     setNotify(contextNotify)
  }, [contextNotify])
    const [show, setShow] = useState(false);
    const [notify, setNotify] = useState({});
// console.log(' toast Notification **************', notification)
    useEffect(() => {
      if (contextNotify?.title) {
        
        setShow(true)
      }
    }, [contextNotify?.title])
      // console.log("notificatoin in   toast notificatoin from context ****" , notify)
  return (
    
   <div>
 
    <section className={`toast-section ${show ?  '' : 'hide-notify'}  `}>
	<div className={` ${!show ? 'hide-notify ' :'show-notify'  } notification success `}>
		<span className="title"> {contextNotify?.title}</span> {contextNotify?.description}<span onClick={()=>setShow(false)} className="close">X</span>
	</div>
</section> 
 </div>
  );
};

export default ToastNotification;
