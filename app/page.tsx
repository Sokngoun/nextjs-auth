"use client"

import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function Home() {

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const payload ={
      username : event.currentTarget.username.value,
      password: event.currentTarget.password.value
    }


    try{
      const {data} = await axios.post("/api/auth/login", payload)

      alert(JSON.stringify(data))

      // redirect user to dashboard
      router.push("/dashboard")
    }catch(e){
      const error = e as AxiosError
      alert(error.message)
    }
  }

  return (
    <main className='h-screen flex-col items-center flex justify-center gap-y-4'>
      <h1>Nextjs Authentication JWT verify http cookie onyl</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
        <div className='flex justify-between gap-x-2'>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" required className='border rounded border-black text-black'/>
        </div>
        <div className='flex justify-between gap-x-2'>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required className='border rounded border-black text-black'/>
        </div>
        <button type='submit' className='bg-orange-500 rounded py-2 px-4'>Login</button>
      </form>
    </main>
  )
}
