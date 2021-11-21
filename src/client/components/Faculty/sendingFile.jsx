import React from "react";

export default function SendingFile(){
    return (
        <>
            <form action="">
                <label htmlFor="attackFile">
                    Attach File
                </label>
                <input type="file"  accept=".txt"/>
            </form>
            <button type="submit"></button>
        </>
    )
}