"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'
import { User, Settings } from 'lucide-react'

export function AuthButtons() {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-lg text-xs px-2 py-1 h-7"
          >
            <Settings className="w-3 h-3 mr-1" />
            Dash
          </Button>
        </Link>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-7 h-7",
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
    <div className="flex items-center gap-1">
      <SignInButton mode="modal">
        <Button
          variant="ghost"
          size="sm"
          className="text-dark dark:text-light hover:text-purple hover:bg-transparent rounded-lg text-xs px-2 py-1 h-7"
        >
          Login
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button
          variant="purple"
          size="sm"
          className="rounded-lg text-xs px-2 py-1 h-7"
        >
          Join
        </Button>
      </SignUpButton>
    </div>
  )
}