import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/db-helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  let payload: any;
  try {
    payload = await req.json();
  } catch (error) {
    console.error("Error parsing webhook body:", error);
    return new Response("Invalid JSON", { status: 400 });
  }
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the type of event
  const eventType = evt.type;

  // Handle user creation
  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      console.error("No email found for user:", id);
      return new Response("No email found", { status: 400 });
    }

    try {
      const user = await createUser({
        clerk_id: id,
        email: email,
      });

      if (!user) {
        return new Response("Error creating user in database", { status: 500 });
      }

      console.log(`User ${id} created successfully.`);
      return NextResponse.json(
        { message: "User created", user },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error in user creation:", error);
      return new Response("Internal server error during user creation", {
        status: 500,
      });
    }
  }

  // Handle user updates
  if (eventType === "user.updated") {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      console.error("No email found for user update:", id);
      return new Response("No email found", { status: 400 });
    }

    try {
      const user = await updateUser(id, { email });

      if (!user) {
        return new Response("Error updating user in database", { status: 500 });
      }

      console.log(`User ${id} updated successfully.`);
      return NextResponse.json({ message: "User updated", user });
    } catch (error) {
      console.error("Error in user update:", error);
      return new Response("Internal server error during user update", {
        status: 500,
      });
    }
  }

  // Handle user deletion
  if (eventType === "user.deleted") {
    // Note: Clerk might send a user.deleted event for a user that was never created in your DB,
    // for example, if the user was deleted from the Clerk dashboard before the initial webhook succeeded.
    const { id, deleted } = evt.data;

    // The `id` can be undefined for deleted events, so we must check for it.
    if (!id || !deleted) {
      return new Response("Error: Invalid payload for user deletion", {
        status: 400,
      });
    }

    try {
      const success = await deleteUser(id);

      if (!success) {
        // It's possible the user was never in our DB, so this might not be a "hard" error.
        console.warn(
          `Attempted to delete user ${id}, but they were not found in the database.`
        );
        return NextResponse.json({
          message: "User not found in DB, but deletion acknowledged",
        });
      }

      console.log(`User ${id} deleted successfully.`);
      return NextResponse.json({ message: "User deleted" });
    } catch (error) {
      console.error("Error in user deletion:", error);
      return new Response("Internal server error during user deletion", {
        status: 500,
      });
    }
  }

  return new Response("", { status: 200 });
}
