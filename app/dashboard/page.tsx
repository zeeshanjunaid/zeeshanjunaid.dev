import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Container } from '@/components/container'
import { getUserByClerkId, getUserSubscriptions } from '@/lib/db-helpers'
import type { User, Subscription } from '@/lib/types'

export const metadata = {
  title: "Dashboard",
}

async function getUserData(clerkId: string): Promise<{ dbUser: User | null, subscriptions: Subscription[] }> {
  try {
    const dbUser = await getUserByClerkId(clerkId)

    if (!dbUser) {
      return { dbUser: null, subscriptions: [] }
    }

    const subscriptions = await getUserSubscriptions(dbUser.id)

    return { dbUser, subscriptions }
  } catch (error) {
    console.error('Error in getUserData:', error)
    return { dbUser: null, subscriptions: [] }
  }
}

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const { user: dbUser, subscriptions } = await getUserData(user.id)

  if (!dbUser) {
    return (
      <Container className="px-4 lg:px-0 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark dark:text-light mb-4">
            User not found
          </h1>
          <p className="text-dark/70 dark:text-light/70">
            There was an issue loading your account. Please try again.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="px-4 lg:px-0 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold font-ao text-dark dark:text-light">
            Dashboard
          </h1>
          <p className="text-dark/70 dark:text-light/70 mt-2">
            Welcome back! Manage your subscriptions and account settings.
          </p>
        </div>

        {/* Account Info */}
        <div className="bg-light dark:bg-dark rounded-3xl p-6 relative overflow-hidden">
          <div className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 rounded-3xl" />
          <div className="relative z-20">
            <h2 className="text-xl font-bold font-ao text-dark dark:text-light mb-4">
              Account Information
            </h2>
            <div className="space-y-2">
              <p className="text-dark dark:text-light">
                <span className="font-medium">Email:</span> {dbUser.email}
              </p>
              <p className="text-dark dark:text-light">
                <span className="font-medium">Member since:</span> {new Date(dbUser.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-light dark:bg-dark rounded-3xl p-6 relative overflow-hidden">
          <div className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 rounded-3xl" />
          <div className="relative z-20">
            <h2 className="text-xl font-bold font-ao text-dark dark:text-light mb-4">
              Your Subscriptions
            </h2>
            
            {subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-dark/70 dark:text-light/70 mb-4">
                  You don't have any active subscriptions yet.
                </p>
                <a 
                  href="/hire-me"
                  className="inline-flex items-center px-6 py-3 bg-purple text-dark dark:text-light rounded-xl font-medium hover:bg-purple/80 transition-colors"
                >
                  Browse Plans
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div 
                    key={subscription.id}
                    className="border border-lightBorderColor dark:border-darkBorderColor rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-dark dark:text-light">
                          {subscription.plan_name}
                        </h3>
                        <p className="text-sm text-dark/70 dark:text-light/70 capitalize">
                          Status: {subscription.status}
                        </p>
                        <p className="text-sm text-dark/70 dark:text-light/70 capitalize">
                          Payment: {subscription.payment_method}
                        </p>
                        {subscription.current_period_end && (
                          <p className="text-sm text-dark/70 dark:text-light/70">
                            Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {subscription.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-light dark:bg-dark rounded-3xl p-6 relative overflow-hidden">
          <div className="backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor opacity-25 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10 rounded-3xl" />
          <div className="relative z-20">
            <h2 className="text-xl font-bold font-ao text-dark dark:text-light mb-4">
              Your Tasks
            </h2>
            
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-dark/70 dark:text-light/70 mb-4">
                  No tasks assigned yet. Once you subscribe to a plan, I'll create tasks for your project.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="border border-lightBorderColor dark:border-darkBorderColor rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-dark dark:text-light">
                        {task.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-dark/70 dark:text-light/70 mb-2">
                        {task.description}
                      </p>
                    )}
                    <p className="text-xs text-dark/50 dark:text-light/50">
                      Created: {new Date(task.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}