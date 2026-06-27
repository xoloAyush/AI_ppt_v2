import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '#/lib/auth-function';
import { authMiddleware } from '#/middleware/auth';

export const Route = createFileRoute('/')({
  server:{
       middleware: [authMiddleware],
    }, 
  // beforeLoad: async () => {
    
  //   const session = await getSession();

  //   if (!session) {
  //     throw redirect({
  //       to: "/login",
  //     });
  //   }

  //   return { session };
  // },
  component: App 

})

function App() {

  // const data = authClient.getSession()
  // console.log(data)
  
  return (
    <div className=' w-full h-min-screen  flex flex-col justify-center mt-30'>
      {/* <ModeToggle /> */}
      <h1 className='flex flex-col justify-center items-center text-7xl'>AI PPT</h1>
    </div>
  )
}
