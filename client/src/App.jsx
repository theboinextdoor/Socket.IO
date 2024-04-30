import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), [])
  const [message, setMessage] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomID , setRoomId ]= useState("");

  const hnadleSubmitButton = (e) => {
    e.preventDefault();
    socket.emit("message", message)
    setMessage("")
  }


  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log(`user ${socket.id} is connected to the server...`)
    })

    socket.on("welcome", (data) => {
      console.log(data)
    })

    socket.on("recieve-message", (data) => {
      console.log(data)
    })

    return () => {
      socket.disconnect()
    }

  }, [socket])

  return (



    <>
      <h1 className="text-2xl text-center mb-4">{socketID}</h1>
      <form className="max-w-sm mx-auto" onSubmit={hnadleSubmitButton}>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Your Message</label>
          <input
            type="text"
            value={message}
            // id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setMessage(e.target.value)}
            required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Room ID</label>
          <input
            type="text"
            value={roomID}
            // id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setRoomId(e.target.value)}
            required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </>




  )
}

export default App