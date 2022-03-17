import { useState, useEffect } from "react";

//importing api 
import {getTest} from './api/test'



function App() {
  const [data, setData] = useState("Hello friend!");
  useEffect(()=>{
    getTest()
    .then((res)=>{
      console.log(res);
      setData(res.message)
    })
  })
  return (
    <div className="App">
      <h1> {data}</h1>
    </div>
  );
}

export default App;
