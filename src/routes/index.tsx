import { createFileRoute } from '@tanstack/react-router'
import {ModeToggle} from '../components/mode-toggle'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/')({ component: App })

function App() {

  const {data} = authClient.useSession()
  console.log(data)
  
  return (
    <div className=' w-full h-min-screen  flex flex-col justify-center '>
      <ModeToggle />
      <h1 className='flex flex-col justify-center items-center text-7xl'>AI PPT</h1>
    </div>
  )
}
