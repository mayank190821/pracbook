export const initialCode = "";

export const sourceCode = (state = initialCode, {code, type}) => {
    if(type === "ADD_CODE"){
        return code;
    }
    return state;
}