import { authClient } from "@/lib/auth-client"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

type LoginProps = {
  redirect?: string
}

export default function Login({ redirect = "/" }: LoginProps) {

   const [isSubmitting, setIsSubmitting] = useState<
    "github" | "google" | null
  >(null)

  const navigate = useNavigate()

  const signIn = async (provider: "google" | "github") => {
    try{
      setIsSubmitting(provider)

      await authClient.signIn.social({
      provider,
      // callbackURL: redirect,
      fetchOptions:{
        onSuccess:()=>{
          toast.success('Logged in successfully!')
          navigate({to: redirect})

        },
        onError:({error})=>{
          toast.error(error.message || 'Failed to login. Please try again.')
            setIsSubmitting(null)
        }
      }
    })
    }
    catch(error){
      toast.error('Failed to login. Please try again.')
      setIsSubmitting(null)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center  px-4">
      
       

        <div className="space-y-4 flex flex-col">
          <button
            onClick={() => signIn("google")}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            disabled = { isSubmitting !== null }
          >
            <FaGoogle className="text-lg text-red-500" />
            {isSubmitting === 'google' ? "Redirecting..." : "Continue with Google"}
            
          </button>

          <button
            onClick={() => signIn("github")}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-700 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
            disabled = { isSubmitting !== null }
          >
            <FaGithub className="text-lg" />
            {isSubmitting === 'github' ? "Redirecting..." : "Continue with Github"}
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      {/* </div> */}
    </main>
  )
}