import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <h1>CodeFolio</h1>
        <p className="subtitle">Portfolio Personnel - React + Vite</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="info">
          Projet initialisé avec succès ! 🚀
        </p>
      </div>
    </>
  )
}

export default App
