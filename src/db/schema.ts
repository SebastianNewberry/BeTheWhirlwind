import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  numeric,
  date,
  pgEnum,
  geometry,
  index,
} from "drizzle-orm/pg-core";
// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";
// import { db } from "./db";

import { AdapterAccount } from "next-auth/adapters";
import { relations } from "drizzle-orm";

// export const db = drizzle(client);

export const accountTypeEnum = pgEnum("type", ["email", "google", "github"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const accounts = pgTable("accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountType: accountTypeEnum("accountType").notNull(),
  githubId: text("githubId").unique(),
  googleId: text("googleId").unique(),
  password: text("password"),
  salt: text("salt"),
});

export const resetTokens = pgTable("reset_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  token: text("token"),
  tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
});

export const verifyEmailTokens = pgTable("verify_email_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  token: text("token"),
  tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
});

// export const accounts = pgTable(
//   "account",
//   {
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     type: text("type").$type<AdapterAccount["type"]>().notNull(),
//     provider: text("provider").notNull(),
//     providerAccountId: text("providerAccountId").notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: text("token_type"),
//     scope: text("scope"),
//     id_token: text("id_token"),
//     session_state: text("session_state"),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   })
// );

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

// export const verificationTokens = pgTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   })
// );

// export const authenticators = pgTable(
//   "authenticator",
//   {
//     credentialID: text("credentialID").notNull().unique(),
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     providerAccountId: text("providerAccountId").notNull(),
//     credentialPublicKey: text("credentialPublicKey").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credentialDeviceType").notNull(),
//     credentialBackedUp: boolean("credentialBackedUp").notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => ({
//     compositePK: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   })
// );

export const businesses = pgTable(
  "businesses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    description: text("description").notNull(),
    name: text("name").notNull(),
    city: text("city"),
    state: text("state"),
    coordinates: geometry("coordinates", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }),
    imageUrl: text("imageUrl").notNull(),
  },
  (t) => ({
    spatialIndex: index("spatial_index").using("gist", t.coordinates),
  })
);

export const groups = pgTable("groups", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  description: text("description").notNull(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
});

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content").notNull(),
  title: text("title").notNull(),
  createdOn: timestamp("createdOn", { mode: "date" }).notNull(),
  updateOn: timestamp("updatedOn", { mode: "date" }),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  thumbnail: text("thumbnail").notNull(),
});

export const notifications = pgTable("notifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isRead: boolean("isRead").notNull().default(false),
  type: text("type").notNull(),
  message: text("message").notNull(),
  createdOn: timestamp("createdOn", { mode: "date" }).notNull(),
});

export const tags = pgTable("tags", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
  description: text("description").notNull(),
});

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
  description: text("description").notNull(),
});

export const comments = pgTable("comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content").notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: date("dateCreated").notNull(),
  postId: text("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
});

export const commentAffiliatedGroups = pgTable("comment_affiliated_groups", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  groupId: text("groupId")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  commentId: text("commentId")
    .notNull()
    .references(() => comments.id, { onDelete: "cascade" }),
});

export const following = pgTable("following", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  foreignUserId: text("foreignUserId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const invites = pgTable("invites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("token")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  groupId: text("groupId")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
});

export const followingRelationship = relations(following, ({ one }) => ({
  foreignProfile: one(users, {
    fields: [following.foreignUserId],
    references: [users.id],
  }),
  userProfile: one(users, {
    fields: [following.userId],
    references: [users.id],
  }),
}));

export const inviteRelationship = relations(invites, ({ one }) => ({
  user: one(users, {
    fields: [invites.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [invites.userId],
    references: [groups.id],
  }),
}));

export const commentRelations = pgTable(
  "comment_relations",
  {
    commentId: text("comment_id")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    relatedCommentId: text("related_comment_id")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.commentId, table.relatedCommentId] }),
  })
);

export const businessReviews = pgTable("business_group_reviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: text("content").notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: date("dateCreated").notNull(),
  businessId: text("businessId")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
});

export const businessesToTags = pgTable(
  "businesses_to_tags",
  {
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tagId, t.businessId] }),
  })
);

export const businessesToCategories = pgTable(
  "businesses_to_categories",
  {
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.categoryId, t.businessId] }),
  })
);

export const userRatingsToPost = pgTable(
  "user_ratings_to_post",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    stars: integer("stars").notNull(),
    approval: boolean("approval").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.userId] }),
  })
);

export const groupRatingsToPost = pgTable(
  "group_ratings_to_post",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    stars: integer("stars").notNull(),
    approval: boolean("approval").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.groupId] }),
  })
);

export const userRatingsToBusiness = pgTable(
  "user_ratings_to_business",
  {
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    stars: integer("stars").notNull(),
    approval: boolean("approval").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.businessId, t.userId] }),
  })
);

export const groupRatingsToBusiness = pgTable(
  "group_ratings_to_business",
  {
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    stars: integer("stars").notNull(),
    approval: boolean("approval").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.businessId, t.groupId] }),
  })
);

export const memberships = pgTable(
  "memberships",
  {
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    isAdmin: boolean("isAdmin").notNull(),
    isRepresentative: boolean("isRepresentative").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.groupId, t.userId] }),
  })
);

export const reviewsToGroups = pgTable(
  "reviews_to_groups",
  {
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    reviewId: text("review_id")
      .notNull()
      .references(() => businessReviews.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.groupId, t.reviewId] }),
  })
);

export const businessReviewsToGroupsRelations = relations(
  reviewsToGroups,
  ({ one }) => ({
    groups: one(groups, {
      fields: [reviewsToGroups.groupId],
      references: [groups.id],
    }),
    reviews: one(businessReviews, {
      fields: [reviewsToGroups.reviewId],
      references: [businessReviews.id],
    }),
  })
);

export const userRatingsToBusinessRelations = relations(
  userRatingsToBusiness,
  ({ one }) => ({
    business: one(businesses, {
      fields: [userRatingsToBusiness.businessId],
      references: [businesses.id],
    }),
    user: one(users, {
      fields: [userRatingsToBusiness.userId],
      references: [users.id],
    }),
  })
);

export const commentRelationsRelations = relations(
  commentRelations,
  ({ one }) => ({
    comment: one(comments, {
      relationName: "comment",
      fields: [commentRelations.commentId],
      references: [comments.id],
    }),
    relatedComment: one(comments, {
      relationName: "relatedComment",
      fields: [commentRelations.relatedCommentId],
      references: [comments.id],
    }),
  })
);

export const groupRatingsToBusinessRelations = relations(
  groupRatingsToBusiness,
  ({ one }) => ({
    business: one(businesses, {
      fields: [groupRatingsToBusiness.businessId],
      references: [businesses.id],
    }),
    group: one(groups, {
      fields: [groupRatingsToBusiness.groupId],
      references: [groups.id],
    }),
  })
);

export const userRatingsToPostRelations = relations(
  userRatingsToPost,
  ({ one }) => ({
    posts: one(posts, {
      fields: [userRatingsToPost.postId],
      references: [posts.id],
    }),
    users: one(users, {
      fields: [userRatingsToPost.userId],
      references: [users.id],
    }),
  })
);

export const groupRatingsToPostRelations = relations(
  groupRatingsToPost,
  ({ one }) => ({
    posts: one(posts, {
      fields: [groupRatingsToPost.postId],
      references: [posts.id],
    }),
    groups: one(groups, {
      fields: [groupRatingsToPost.groupId],
      references: [groups.id],
    }),
  })
);

export const membershipsRelations = relations(memberships, ({ one }) => ({
  group: one(groups, {
    fields: [memberships.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
}));

export const businessesToTagsRelations = relations(
  businessesToTags,
  ({ one }) => ({
    business: one(businesses, {
      fields: [businessesToTags.businessId],
      references: [businesses.id],
    }),
    tag: one(tags, {
      fields: [businessesToTags.tagId],
      references: [tags.id],
    }),
  })
);

export const businessesToCategoriesRelations = relations(
  businessesToCategories,
  ({ one }) => ({
    business: one(businesses, {
      fields: [businessesToCategories.businessId],
      references: [businesses.id],
    }),
    category: one(categories, {
      fields: [businessesToCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export const commentsToAffiliatedGroupsRelations = relations(
  commentAffiliatedGroups,
  ({ one }) => ({
    comment: one(comments, {
      fields: [commentAffiliatedGroups.commentId],
      references: [comments.id],
    }),
    group: one(groups, {
      fields: [commentAffiliatedGroups.groupId],
      references: [groups.id],
    }),
  })
);

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  relatedComments: many(commentRelations, {
    relationName: "relatedComment",
  }),
  referringComments: many(commentRelations, {
    relationName: "comment",
  }),
  affiliatedGroups: many(commentAffiliatedGroups),
  posts: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const businessReviewsRelations = relations(
  businessReviews,
  ({ many, one }) => ({
    reviewsToGroups: many(reviewsToGroups),
    businesses: one(businesses, {
      fields: [businessReviews.businessId],
      references: [businesses.id],
    }),
    author: one(users, {
      fields: [businessReviews.authorId],
      references: [users.id],
    }),
  })
);

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  userRatingsToPost: many(userRatingsToPost),
  groupRatingsToPost: many(groupRatingsToPost),
  comments: many(comments),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  users: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  posts: many(posts),
  userRatingToPosts: many(userRatingsToPost),
  memberships: many(memberships),
  userRatingsToBusiness: many(userRatingsToBusiness),
  comments: many(comments),
  businessReviews: many(businessReviews),
  notifications: many(notifications),
  invites: many(invites),
}));

export const businessesRelations = relations(businesses, ({ many }) => ({
  businessesToTags: many(businessesToTags),
  businessesToCategories: many(businessesToCategories),
  userRatingsToBusiness: many(userRatingsToBusiness),
  groupRatingsToBusiness: many(groupRatingsToBusiness),
  businessReviews: many(businessReviews),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  businessesToTags: many(businessesToTags),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  businessesToCategories: many(businessesToCategories),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  memberships: many(memberships),
  groupRatingsToPost: many(groupRatingsToPost),
  groupRatingsToBusiness: many(groupRatingsToBusiness),
  invites: many(invites),
  comments: many(commentAffiliatedGroups),
}));

//TYPES

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;
export type NewCategory = typeof categories.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
