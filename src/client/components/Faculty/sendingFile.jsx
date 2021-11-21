import React from "react";
import { useState } from "react";
import axios from "axios";

export default function SendingFile(){
    const [file,setFile] = useState();
    const send =()=>{
        const data = new FormData();
        data.append("file",file);
    };
    
    return (
        <>
            <form action="">
                <label htmlFor="attackFile">
                    Attach File
                </label>
                <input type="file"  accept=".txt" onChange={event=>{
                    const file =event.target.files[0];
                    setFile(file);
                }} />
            </form>
            <button type="submit" onClick={send}>Send</button>
        </>
    )
}