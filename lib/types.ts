export interface User {
  id: string
  clerk_id: string
  email: string
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_name: string
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing'
  current_period_end?: string
  payment_method: 'stripe' | 'crypto'
  stripe_subscription_id?: string
  created_at: string
  updated_at: string
}

export interface PricingTier {
  id: string
  name: string
  price: string
  description: string
  features: {
    icon: React.ReactNode
    text: string
  }[]
  popular?: boolean
  ctaText: string
}