import { useState } from "react" //imports usestate function

const App = () => {
    const [counter, setCounter] = useState(0) //usestate function call

    setTimeout(
        ()=>setCounter(counter + 1),
        1000
        
    )
    console.log('rendering',counter )
    return (
      <div>{counter}</div>
    )
  }
  
  export default App