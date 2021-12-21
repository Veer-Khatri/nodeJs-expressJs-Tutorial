import { createServer } from "http";
const server =  createServer((requestt,responsee)=>{
    console.log(requestt.url); // it will without importing url 
    // server routing 
    if (requestt.url === "/") {
        responsee.end("hello home");
    }
    else if(requestt.url === "/about"){
        responsee.end("hello about");
    }
    else if(requestt.url === "/contact"){
        responsee.end("hello contact");
    }
    // creating own api
    else if(requestt.url === "/api"){
        responsee.end("hello api");
    }
    else{
        responsee.end("ab bas bhi kar bhai");
    }
})
let host = "127.0.0.1"
let port = "8000" 
server.listen(port,host,()=>{
    console.log(`listening at ${host}:${port}`);

})