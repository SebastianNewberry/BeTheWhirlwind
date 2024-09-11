import { database } from "@/db";
import { invites } from "@/db/schema";
import { GroupId, UserId } from "@/use-cases/types";
import { and, eq } from "drizzle-orm";

export async function getInvite(userId: UserId) {
  return await database.query.invites.findFirst({
    where: eq(invites.userId, userId),
  });
}

export async function deleteInvite(userId: UserId, groupId: GroupId) {
  await database
    .delete(invites)
    .where(and(eq(invites.userId, userId), eq(invites.groupId, groupId)));
}

export async function createInvite(userId: UserId, groupId: GroupId) {
  const [invite] = await database
    .insert(invites)
    .values({
      groupId,
      userId,
    })
    .returning();
  return invite;
}
