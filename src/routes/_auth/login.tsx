import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import Login from '../../components/auth/login-form'
import { Presentation } from 'lucide-react';
import { z } from "zod";
import { authMiddleware } from '#/middleware/auth';
import { getSession } from '#/lib/auth-function';

const loginSearchSchema = z.object({
  redirect: z.string().optional().default("/"),
});

export const Route = createFileRoute("/_auth/login")({
  server:{
     middleware: [authMiddleware],
  },
  // beforeLoad: async ({location}) => {
  //     const session = await getSession();
  
  //     if (session) {
  //       throw redirect({
  //         to: "/",
  //         search:{redirect:location.href}
  //       });
  //     }
  
  //     return { session };
  //   },
  validateSearch: loginSearchSchema,
  component: LoginPage,
});

function LoginPage() {

    const { redirect } = Route.useSearch();

  return (
  <div className='min-h-screen flex items-center justify-center p-4 '>
    <div className='w-full max-w-md'>
        <div className='glass rounded-3xl p-8 space-y-6'>
            {/* {LOGO} */}

            <div className='flex flex-col items-center gap-3'>
                <Link to='/' className='no-underline'>
                <div className='p-4 rounded-b-md  bg-primary flex justify-center'>
                    <Presentation className='text-black size-8' />
                </div>            
                 
                </Link>

                <div className='text-center'>
                     <h1 className='text-2xl font-bold'>Welcome to <span className='text-primary'>PPT.ai</span></h1>

                     <p className='text-muted-foreground text-sm mt-1'>Sign in to create beautiful presentation</p>
                </div>
            </div>

            {/* {Login Form} */}
            <Login redirect = {redirect}/>
        </div>
    </div>
 
  </div>
  )
}
