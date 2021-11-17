const studentSignup = async(data)=>{
    try{
        let response = await fetch("/api/student/signup",{
            method:"POST",
            header:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
        });
        return await response.json();
    }
    catch(err){
        console.log(err);
    }
}
export {studentSignup};