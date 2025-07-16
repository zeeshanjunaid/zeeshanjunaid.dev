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
            size="default"
            className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-lg text-sm px-4 py-2 h-9 uppercase font-medium"
          >
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <ModeToggle />
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
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
    <div className="flex items-center gap-3">
      <ModeToggle />
      <SignInButton mode="modal">
        <Button
          variant="purple"
          size="default"
          className="rounded-lg text-sm px-6 py-2 h-9 uppercase font-medium"
        >
          Join / Login
        </Button>
      </SignInButton>
    </div>
  )
}