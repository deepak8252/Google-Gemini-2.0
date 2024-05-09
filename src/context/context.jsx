import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState();
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousprompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultdata, setResultData] = useState();

    // Function to delay appending next word to resultdata
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false)
    }

    // Function to handle sending prompt and processing response
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPreviousPrompt(prev=>[...prev,input])
        // const response = await runChat(input);
        let response;
        if(prompt !== undefined){
            response=await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPreviousPrompt(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await runChat(input)
        }

        let responseArray = response.split("**");
        let newarray = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newarray += responseArray[i];
            } else {
                newarray += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newarray.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextword = newResponseArray[i];
            delayPara(i, nextword + " ");
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        previousprompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        resultdata,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
