import { LoginForm } from '@/features/auth/components/login-form'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md">
         <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Athos Track</h1>
            <p className="text-muted-foreground mt-2">Relatórios de viagem simplificados</p>
         </div>
        <LoginForm />
      </div>
    </div>
  )
}

