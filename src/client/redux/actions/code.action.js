export const saveCode = (code) => {
    return {
        type: "ADD_CODE",
        code: code
    }
}
export const saveQuestion=(question)=>{
    return {
        type:"ADD_QUESTION",
        question:question
    }
}