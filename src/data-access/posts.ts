import { database } from "@/db";
import { NewPost, Post, groups, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createPost(newPost: NewPost) {
  return await database.insert(posts).values(newPost);
}

export async function deletePost(postId: string) {
  const [post] = await database
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();
  return post;
}

export async function getPostById(postId: string) {
  return await database.query.posts.findFirst({
    where: eq(posts.id, postId),
  });
}

export async function getRecentPublicPostsByUserId(userId: string) {
  const results = await database.query.posts.findMany({
    where: eq(posts.authorId, userId),
  });
  return results;
}

export async function updatePost(postId: string, updatedPost: Partial<Post>) {
  const [post] = await database
    .update(posts)
    .set(updatedPost)
    .where(eq(posts.id, postId))
    .returning();
  return post;
}
