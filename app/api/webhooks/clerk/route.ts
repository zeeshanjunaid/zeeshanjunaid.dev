import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser, deleteUser } from '@/lib/db-helpers'

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data
    const email = email_addresses[0]?.email_address

    if (!email) {
      console.error('No email found for user:', id)
      return new Response('No email found', { status: 400 })
    }

    try {
      const user = await createUser({
        clerk_id: id,
        email: email,
      })

      if (!user) {
        return new Response('Error creating user', { status: 500 })
      }

      console.log('User created successfully:', user)
    } catch (error) {
      console.error('Error in user creation:', error)
      return new Response('Internal server error', { status: 500 })
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses } = evt.data
    const email = email_addresses[0]?.email_address

    if (!email) {
      console.error('No email found for user:', id)
      return new Response('No email found', { status: 400 })
    }

    try {
      const user = await updateUser(id, { email })

      if (!user) {
        return new Response('Error updating user', { status: 500 })
      }

      console.log('User updated successfully')
    } catch (error) {
      console.error('Error in user update:', error)
      return new Response('Internal server error', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    try {
      const success = await deleteUser(id)

      if (!success) {
        return new Response('Error deleting user', { status: 500 })
      }

      console.log('User deleted successfully')
    } catch (error) {
      console.error('Error in user deletion:', error)
      return new Response('Internal server error', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}