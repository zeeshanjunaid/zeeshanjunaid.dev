import { SignIn } from '@clerk/nextjs'
import { Container } from '@/components/container'
import { BlurBG } from '@/components/blur-bg'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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

          {/* Sign In Form Container */}
          <div className="relative rounded-3xl overflow-hidden">
            <BlurBG className="rounded-3xl" />
            <div className="relative z-20 p-6 md:p-8">
              <SignIn 
                appearance={{
                  elements: {
                    // Remove default styling to use our custom container
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none border-none p-0 rounded-none",
                    
                    // Header styling
                    headerTitle: "hidden", // We have our own header
                    headerSubtitle: "hidden",
                    
                    // Form elements
                    formFieldLabel: "text-dark dark:text-light font-medium text-sm mb-2 font-switzer",
                    formFieldInput: `
                      bg-light dark:bg-dark 
                      border border-lightBorderColor dark:border-darkBorderColor 
                      text-dark dark:text-light 
                      rounded-xl px-4 py-3 font-switzer
                      focus:border-purple focus:ring-1 focus:ring-purple
                      transition-colors duration-200
                    `,
                    
                    // Buttons
                    formButtonPrimary: `
                      bg-purple hover:bg-purple/80 
                      text-white font-medium font-switzer
                      rounded-xl px-6 py-3 w-full
                      transition-colors duration-200
                      border-none
                    `,
                    
                    // Social buttons
                    socialButtonsBlockButton: `
                      bg-light dark:bg-dark 
                      border border-lightBorderColor dark:border-darkBorderColor 
                      text-dark dark:text-light 
                      font-switzer font-medium
                      rounded-xl px-4 py-3 w-full
                      hover:bg-lightBorderColor dark:hover:bg-darkBorderColor
                      transition-all duration-200
                    `,
                    socialButtonsBlockButtonText: "text-dark dark:text-light font-medium font-switzer",
                    
                    // Links and text
                    footerActionLink: "text-purple hover:text-purple/80 font-medium font-switzer",
                    identityPreviewText: "text-dark dark:text-light",
                    
                    // Dividers
                    dividerLine: "bg-lightBorderColor dark:bg-darkBorderColor",
                    dividerText: "text-dark/50 dark:text-light/50 text-sm font-switzer",
                    
                    // Error messages
                    formFieldErrorText: "text-red-600 dark:text-red-400 text-sm mt-1 font-switzer",
                    
                    // Footer
                    footer: "text-center mt-6",
                    footerText: "text-dark/70 dark:text-light/70 text-sm font-switzer",
                    
                    // Additional styling
                    main: "space-y-4",
                    formContainer: "space-y-4",
                    socialButtons: "space-y-3",
                    socialButtonsProviderIcon: "w-5 h-5"
                  }
                }}
                redirectUrl="/dashboard"
              />
            </div>
          </div>

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