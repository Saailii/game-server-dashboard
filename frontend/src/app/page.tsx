"use client"

import { useEffect, useState } from "react"

export default function Home() {
  

  const onSubmit = async () => {
    const response = await fetch('http://localhost:3333/me', {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });
      
      const data = await response.json()
      
      
      
      
    
  }


  return (
    <div>
      <button className="btn btn-primary" onClick={onSubmit}>Test middleware</button>
       <h1 className="text-3xl font-bold mb-4">Hello DaisyUI</h1>
      
    </div>
  )
}
