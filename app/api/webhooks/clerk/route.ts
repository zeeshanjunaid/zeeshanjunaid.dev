import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

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
      // Create user in Supabase
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          clerk_id: id,
          email: email,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user in Supabase:', error)
        return new Response('Error creating user', { status: 500 })
      }

      console.log('User created successfully:', data)
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
      // Update user in Supabase
      const { error } = await supabaseAdmin
        .from('users')
        .update({
          email: email,
          updated_at: new Date().toISOString(),
        })
        .eq('clerk_id', id)

      if (error) {
        console.error('Error updating user in Supabase:', error)
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
      // Delete user from Supabase (subscriptions will be cascade deleted)
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('clerk_id', id)

      if (error) {
        console.error('Error deleting user from Supabase:', error)
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