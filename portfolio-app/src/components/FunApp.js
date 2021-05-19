import { useEffect, useState } from "react";

function FunApp (){
    const [count, setCount] =useState(0);
    const [name, setName] =useState('akshay');
    
    useEffect(()=>{
        document.title = `${name} clicked ${count} times`;
      },[count, name]
    );
  
    return (<div>
      <div className="container my-3 p-3">
        <p>{name} clicked {count} times.</p>
          <button onClick={()=>{setCount(count+1)}}>
            Increase count
          </button>
          <button onClick={()=>setName(
            name==='akshay'?'abhay':'akshay'
            )}>
            Change name
          </button>
      </div>
    </div>);
  }
  export default FunApp;