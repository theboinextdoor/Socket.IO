import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import {createServer} from "http"
import { join } from "path";


const PORT = 3000 || process.env.PORT;
const app= express();
const server = createServer(app)
const io= new Server(server , {
    cors :{
        origin : "http://localhost:5173",
        methods : ["GET" , "POST"],
        credentials : true,
    }
})

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    })
  );



app.get("/" , (req , res)=>{
    res.send("Hellow World , Do you know that you are a bitch")
})


io.on("connection" , (socket)=>{
    console.log(`User Connected ${socket.id}`)
    socket.emit("welcome" , `Welcome to the server`)
    socket.broadcast.emit("welcome" , `${socket.id} has joined the server`)


    socket.on("message" , ({room , message})=>{
        console.log({room , message})


        // this line helps us to send the message on both the side , means the message will not reflect on my side 
        io.to(room).emit("recieve-message" , message)

        // this line helps us to send the message to the reciever only , means the message will not reflect on my side 
        // socket.broadcast.emit("recieve-message" , data)   
    })

    

    socket.on("dissconnect" , ()=>{
        console.log(`User ${socket.id} is disconnected`)
    })

})


server.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
})
