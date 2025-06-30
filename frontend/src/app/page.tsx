"use client"

import { useEffect } from "react"

export default function Home() {

  const onSubmit = async () => {
    const response = await fetch('http://localhost:3333/game-compose', {
      headers: {
        "Authorization": "Bearer oat_MTA.d3liY3V5SkZfbUNremtKVTlyM1pfSGpsS3JpaU9lRWhiNWFQTndrUjE4MDI2MjQ3Mzc",
        "Content-Type": "application/json"
      }});
      const data = await response.json()
      
      
    
  }


  return (
    <div>
      <button onClick={onSubmit}>Test middleware</button>
       <h1 className="text-3xl font-bold mb-4">Hello DaisyUI</h1>
      <button className="btn btn-primary">C’est un bouton</button>
    </div>
  )
}
