"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'
import { User, Settings } from 'lucide-react'

export function AuthButtons() {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-xl"
          >
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonPopoverCard: "bg-light dark:bg-dark border border-lightBorderColor dark:border-darkBorderColor",
              userButtonPopoverActionButton: "text-dark dark:text-light hover:bg-purple/20",
              userButtonPopoverActionButtonText: "text-dark dark:text-light",
              userButtonPopoverFooter: "hidden"
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <SignInButton mode="modal">
        <Button
          variant="ghost"
          size="sm"
          className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-xl"
        >
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button
          variant="purple"
          size="sm"
          className="rounded-xl"
        >
          Sign Up
        </Button>
      </SignUpButton>
    </div>
  )
}