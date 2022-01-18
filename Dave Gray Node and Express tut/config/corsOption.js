// CORS --- Cross Origin Resource Sharing
// the whitelist websites only can request us to access our routes
const whiteList  = [`132.154.79.138/32 `,`0.0.0.0/0`,`https://www.google.com`,`http://127.0.0.1:55000`,"http://localhost:3500","http://127.0.0.1:3500"]
const corsOptions ={
    origin: (origin,callback)=>{
        if (whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true);
            
        }else{
            callback(new Error("not allowed by CORS"))
        }

    },
    optionSuccssStatus : 200
}

module.exports = corsOptions