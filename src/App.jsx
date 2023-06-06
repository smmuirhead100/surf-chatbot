import React from 'react'
import { Configuration,OpenAIApi } from "openai"
import './App.css'
import send from './assets/icon.png'

const API_KEY = "INSERT API KEY HERE"

const openai = new OpenAIApi(new Configuration({
  apiKey: API_KEY
}))


export default function App() {
  
  const [prompt, setPrompt] = React.useState('')
  const [botAnswer, setBotAnswer] = React.useState('Hello, how can I assist you today?')
  
  async function handleSubmit(event) {
    event.preventDefault()
  
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt}]
      })
    
    setBotAnswer(res.data.choices[0].message.content)
   }

  function handleChange(e){
    setPrompt(e.target.value)
  }
  
  
  return (
      <div className='main'>
          <header>The Real Local</header>
          <div className='wrapper'>
            <div>{botAnswer}</div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange}></input>
                <button type='submit'><img src={send}/></button>
            </form>
          </div>
      </div>
    )
}

