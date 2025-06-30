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
      console.log(data);
      
    
  }


  return (
    <div>
      <button onClick={onSubmit}>Test middleware</button>
    </div>
  )
}
