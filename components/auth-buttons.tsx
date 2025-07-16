"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'
import { User, Settings } from 'lucide-react'
import { ModeToggle } from './theme-toggle'

export function AuthButtons() {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="default"
            className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-lg text-sm px-4 py-2 h-9 font-medium"
          >
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <ModeToggle />
        <UserButton 
          appearance={{
            elements: {
              // Avatar styling
              avatarBox: "w-9 h-9 rounded-lg",
              avatarImage: "rounded-lg",
              
              // Popover card styling
              userButtonPopoverCard: `
                bg-light dark:bg-dark 
                border border-lightBorderColor dark:border-darkBorderColor 
                rounded-xl shadow-lg
              `,
              
              // Header section
              userButtonPopoverHeader: "pb-4 border-b border-lightBorderColor dark:border-darkBorderColor",
              
              // Action buttons
              userButtonPopoverActionButton: `
                text-dark dark:text-light 
                hover:bg-purple/20 
                rounded-lg 
                transition-colors duration-200
              `,
              userButtonPopoverActionButtonText: "text-dark dark:text-light font-medium",
              userButtonPopoverActionButtonIcon: "text-dark dark:text-light",
              
              // Footer
              userButtonPopoverFooter: "hidden",
              
              // Main identifier
              userButtonPopoverMain: "text-dark dark:text-light",
              
              // User preview
              userPreview: "text-dark dark:text-light",
              userPreviewMainIdentifier: "text-dark dark:text-light font-medium",
              userPreviewSecondaryIdentifier: "text-dark/70 dark:text-light/70"
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <ModeToggle />
      <SignInButton mode="modal">
        <Button
          variant="purple"
          size="default"
          className="rounded-lg text-sm px-6 py-2 h-9 font-medium"
        >
          Sign In
        </Button>
      </SignInButton>
    </div>
  )
}