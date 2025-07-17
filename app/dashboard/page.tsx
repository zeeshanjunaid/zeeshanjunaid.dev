import { Container } from "@/components/container";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { getUserSubscriptions, getUserTasks, getCurrentUser } from "@/lib/db-helpers";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default async function DashboardPage() {
  // Fetch data on the server
  const user = await getCurrentUser();
  
  if (!user) {
    return (
      <ProtectedRoute>
        <Container className="px-4 lg:px-0 py-12">
          <div className="text-center">
            <p className="text-dark/70 dark:text-light/70">Please sign in to view your dashboard.</p>
          </div>
        </Container>
      </ProtectedRoute>
    );
  }

  // Fetch user data on the server
  const [subscriptions, tasks] = await Promise.all([
    getUserSubscriptions(user.id),
    getUserTasks(user.id),
  ]);

  return (
    <ProtectedRoute>
      <DashboardContent 
        user={user}
        subscriptions={subscriptions}
        tasks={tasks}
      />
    </ProtectedRoute>
  );
}