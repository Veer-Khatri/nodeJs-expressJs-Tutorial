import { createServer } from "http";
const server =  createServer((requestt,responsee)=>{
    responsee.end("hemllo");
})
let host = "127.0.0.1"
let port = "8000" 
server.listen(port,host,()=>{
    console.log(`listening at ${host}:${port}`);

})