import React, { useContext } from 'react'
import "./main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Main = () => {
    const {previousprompt,setPreviousPrompt,onSent,setRecentPrompt,recentPrompt,showResult,setShowResult,loading,resultdata,input,setInput} =useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult?
                <>
                <div className="greet">
                <p><span>hello, dev.</span></p>
                <p>how can i help you today</p>

            </div>
            <div className="cards">
            <div className="card">
                    <p>suggest beautiful places to see on an upcomming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>briefly summerise this conecpt: urban planning </p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, eveniet?</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, corrupti?</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
                </>:<div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {
                            loading?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>: <p dangerouslySetInnerHTML={{__html:resultdata}}></p>
                        }
                       
                    </div>
                </div>
            }
            
            <div className="main-bottam">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input}type="text"placeholder='enter a promt here ' />
                    <div>
                    <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {
                    input?  <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null
                }
              
                    </div>
                </div>
                <p className='bottom-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis distinctio quod repellendus voluptate accusamus reprehenderit dignissimos, necessitatibus aut officia cum.</p>

            </div>
        </div>
    </div>
  )
}

export default Main