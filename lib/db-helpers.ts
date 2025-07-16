import { supabaseAdmin } from './supabase'
import type { User, UserInsert, Subscription, SubscriptionInsert } from './types'

// User operations
export async function createUser(userData: UserInsert): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createUser:', error)
    return null
  }
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single()

    if (error) {
      console.error('Error fetching user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserByClerkId:', error)
    return null
  }
}

export async function updateUser(clerkId: string, updates: Partial<User>): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('clerk_id', clerkId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateUser:', error)
    return null
  }
}

export async function deleteUser(clerkId: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('clerk_id', clerkId)

    if (error) {
      console.error('Error deleting user:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteUser:', error)
    return false
  }
}

// Subscription operations
export async function createSubscription(subscriptionData: SubscriptionInsert): Promise<Subscription | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single()

    if (error) {
      console.error('Error creating subscription:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createSubscription:', error)
    return null
  }
}

export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching subscriptions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getUserSubscriptions:', error)
    return []
  }
}

export async function updateSubscription(subscriptionId: string, updates: Partial<Subscription>): Promise<Subscription | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', subscriptionId)
      .select()
      .single()

    if (error) {
      console.error('Error updating subscription:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateSubscription:', error)
    return null
  }
}

export async function getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', stripeSubscriptionId)
      .single()

    if (error) {
      console.error('Error fetching subscription by Stripe ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getSubscriptionByStripeId:', error)
    return null
  }
}