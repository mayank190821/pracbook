import request from 'request';
import config from "../../config/config";
const fetchExam = async (id) => {
    let response = await fetch("/api/exam", {
        method: "GET",
        headers: {
            Accept: "application/json",
            id: id
        }
    })
    return await response.json();
}

const compileCode = () => {
    var program = {
        script : "print(2+3)",
        language: "python3",
        versionIndex: "0",
        clientId: config.clientId,
        clientSecret:config.clientSecret
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        mode: "no_cors",
        method: "POST",
        json: program
    },
    setTimeout(3000),
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });
}

export { fetchExam, compileCode }