import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscriptions, getUserTasks } from "@/lib/actions"; // Updated import
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Container } from "@/components/container";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: dbUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const [subscriptions, tasks] = await Promise.all([
    getUserSubscriptions(user.id),
    getUserTasks(user.id),
  ]);

  if (!dbUser) {
    return (
      <ProtectedRoute>
        <Container className="px-4 lg:px-0 py-12">
          <div className="text-center">
            <p className="text-dark/70 dark:text-light/70">
              Could not find user data.
            </p>
          </div>
        </Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardContent
        user={dbUser}
        subscriptions={subscriptions}
        tasks={tasks}
      />
    </ProtectedRoute>
  );
}
