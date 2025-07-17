import { Container } from '@/components/container'
import { BlurBG } from '@/components/blur-bg'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AuthForm } from '@/components/auth/auth-form'

export const metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Container className="px-4 lg:px-0">
        <div className="max-w-md mx-auto">
          {/* Back to Home Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-dark/70 dark:text-light/70 hover:text-purple transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light mb-2">
              Welcome Back
            </h1>
            <p className="text-dark/70 dark:text-light/70 font-light">
              Sign in to your account to continue
            </p>
          </div>

          {/* Sign In Form */}
          <AuthForm mode="signin" />

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-dark/70 dark:text-light/70 text-sm">
              Don&apos;t have an account?{' '}
              <Link 
                href="/sign-up" 
                className="text-purple hover:text-purple/80 font-medium transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}