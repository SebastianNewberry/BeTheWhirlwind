import { database, db } from "@/db";
import { Group, NewGroup, groups, memberships, users } from "@/db/schema";
import { GroupId } from "@/use-cases/types";
import { UserId } from "@/use-cases/types";
import { and, count, eq, ilike, sql } from "drizzle-orm";
import { GROUPS_PER_PAGE } from "@/app-config";

export async function createGroup(group: NewGroup) {
  await database.insert(groups).values(group);
}

export async function searchGroupsByName(search: string, page: number) {
  const countResult = await db
    .select({
      count: count(),
      groupId: groups.id,
      groupName: groups.name,
      groupImage: groups.imageUrl,
    })
    .from(groups)
    .where(ilike(groups.name, `%${search}%`))
    .limit(GROUPS_PER_PAGE)
    .offset((page - 1) * GROUPS_PER_PAGE);

  return {
    count: countResult,
    groups: groups,
  };
}

export async function getGroupById(groupId: GroupId) {
  return await database.query.groups.findFirst({
    where: eq(groups.id, groupId),
  });
}

export async function updateGroup(
  groupId: GroupId,
  updatedGroup: Partial<Group>
) {
  await database.update(groups).set(updatedGroup).where(eq(groups.id, groupId));
}

export async function deleteGroup(groupId: GroupId) {
  await database.delete(groups).where(eq(groups.id, groupId));
}

export async function deleteGroupMembership(userId: string, groupId: string) {
  await database
    .delete(memberships)
    .where(
      and(eq(memberships.groupId, groupId), eq(memberships.userId, userId))
    );
}

export async function getGroupProfiles(groupId: GroupId) {
  return await database.query.memberships.findMany({
    where: eq(memberships.groupId, groupId),
    with: {
      user: true,
    },
  });
}

export async function getGroupProfilesByName(
  groupId: GroupId,
  search: string,
  page: number
) {
  return await db
    .select({
      userId: memberships.userId,
      username: users.name,
      image: users.image,
      count: count(),
    })
    .from(memberships)
    .innerJoin(users, eq(memberships.userId, users.id))
    .where(
      and(eq(memberships.groupId, groupId), ilike(users.name, `%${search}%`))
    )
    .limit(GROUPS_PER_PAGE)
    .offset((page - 1) * GROUPS_PER_PAGE)
    .execute();
}

export async function getGroupsByMemberName(
  userId: UserId,
  search: string,
  page: number
) {
  return await db
    .select({
      groupId: memberships.groupId,
      imageUrl: groups.imageUrl,
      groupName: groups.name,
      count: count(),
    })
    .from(memberships)
    .innerJoin(groups, eq(memberships.groupId, groups.id))
    .where(
      and(eq(memberships.userId, userId), ilike(groups.name, `%${search}%`))
    )
    .limit(GROUPS_PER_PAGE)
    .offset((page - 1) * GROUPS_PER_PAGE)
    .execute();
}

export async function getGroupMemberById(groupId: GroupId, userId: UserId) {
  return await database.query.memberships.findFirst({
    where: and(
      eq(memberships.groupId, groupId),
      eq(memberships.userId, userId)
    ),
  });
}
