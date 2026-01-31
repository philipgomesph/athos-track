import { SignupForm } from '@/features/auth/components/signup-form'

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md">
         <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Athos Track</h1>
            <p className="text-muted-foreground mt-2">Crie sua conta</p>
         </div>
        <SignupForm />
      </div>
    </div>
  )
}

