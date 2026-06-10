import React from 'react'
import { getCurrentUser } from '../lib/auth';

const page = async() => {
    const user= await getCurrentUser();
  return (
    <div>{user?.name}
    <h1>hello</h1></div>
  )
}

export default page