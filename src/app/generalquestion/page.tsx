'use client'
import React, { useState } from 'react'
import { apiClient } from '../lib/apiclient';
import Markdown from 'react-markdown';

const generalquestionpage = () => {
  const [content,setContent]=useState("");
  const [error,setError]=useState("");
  const [analysis,setAnalysis]=useState("");
  const handelsubmit = async (
    e: React.FormEvent<HTMLFormElement>
  )=>{
    e.preventDefault();
    if(!content.trim()){
      setError("please provide content");
      return;
    }
    try {
      setError("");
      const data=await apiClient.generalquestion(content);
      setAnalysis(data.response)
      
    } catch (error) {
      setError(error instanceof Error?error.message:"something went wrong")
      
    }

  }
  return (
    <div>
      <h1 className='text-center font-bold text-4xl'>Ask your Doute</h1>
      <form onSubmit={handelsubmit}>
        <textarea  className='block mx-auto mt-3.5 bg-gray-700 text-white p-4 w-[80%] h-[100px] rounded-2xl'
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className=' block mt-3 mx-auto bg-blue-400 text-blue-600 hover:bg-blue-200 p-3.5 rounded-full font-bold'>
          Ask Question
        </button>
      </form>
      {error &&(
        <div>{error}</div>
      )}
      {analysis &&(
        <div className='w-[80%] mx-auto mt-2.5'><Markdown>{analysis}</Markdown></div>
      )}

    </div>
  )
}

export default generalquestionpage