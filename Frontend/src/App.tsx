import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Signin } from "./Pages/Singin"
import { Blog } from "./Pages/Blog"
import { Blogs } from "./Pages/Blogs"
import { Publish } from "./Pages/Publish"
import {DashBoard} from "./Pages/Dashboard"



function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route  path="/signup" element={<Signup />}/>
        <Route  path="/signin" element={<Signin />}/>
       <Route  path="/blog/:id" element={<Blog />}/>
       <Route path="/blogs" element={<Blogs />}/>
       <Route path="/publish" element={<Publish />} />
      
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
