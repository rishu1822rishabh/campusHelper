import React from 'react'
import Header from '../component/header'
import { apiClient } from '../lib/apiclient'
import { getCurrentUser } from '../lib/auth'

const layout = async({children}:{children:React.ReactNode}) => {
    const user=await getCurrentUser()
  return (
   <div>
    <Header user={user||null}/>
    <main>{children}</main>
   </div>
  )
}

export default layout