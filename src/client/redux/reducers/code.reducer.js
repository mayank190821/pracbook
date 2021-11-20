export const initialCode = "";
export const initialQuestion=[];

export const sourceCode = (state = initialCode, {code, type}) => {
    if(type === "ADD_CODE"){
        return code;
    }
    return state;
}

export const ques =(state = initialQuestion,{question,type})=>{
    if(type === "ADD_QUESTION"){
        return question
    }
    return state;
}