import React, { useContext, useState } from 'react'
import "./sidebar.css";
import {assets} from "../../assets/assets"
import { Context } from '../../context/context';
const Sidebar = () => {
    const [extended ,setExtended]=useState(false);
    const {onSent, previousprompt,setRecentPrompt,newChat}=useContext(Context);
    const loadPrompt=async (prompt)=>{
      setRecentPrompt(prompt)
await onSent(prompt);
    }
  return (
    <div className='sidebar'>
        <div className="top">
<img className='menu'onClick={()=>setExtended(!extended)} src={assets.menu_icon} alt="menu-icon" />
<div className="new-chat" onClick={()=>newChat()}>
    <img src={assets.plus_icon} alt="plusicon" className='' />
   {extended?<p>new chat</p>:null} 
</div>
{
    extended?<div className="recent" >
    <p className='recent-title'>Recent</p>
    {
      previousprompt.map((item,index)=>{
return(
<>
<div className="recent-entry" onClick={()=>loadPrompt(item)}>
       <img src={assets.message_icon} alt="messahe icon" />
       <p>{item.slice(0,18)}...</p>
    </div>
</>
)
      })
    }
   
   </div>:null
}

        </div>
        <div className="bottom">
         <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
          {extended?<p>help</p>:null}  
         </div>
         <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
          {extended? <p>activity</p>:null} 
         </div>
         <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
           {extended? <p>settings</p>:null}
         </div>
        </div>
    </div>
  )
}

export default Sidebar