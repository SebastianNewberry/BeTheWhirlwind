CREATE TABLE IF NOT EXISTS "business_group_reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"authorId" text NOT NULL,
	"dateCreated" date NOT NULL,
	"businessId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_to_groups" (
	"group_id" text NOT NULL,
	"comment_id" text NOT NULL,
	CONSTRAINT "comments_to_groups_group_id_comment_id_pk" PRIMARY KEY("group_id","comment_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "replies_to_groups" (
	"group_id" text NOT NULL,
	"reply_id" text NOT NULL,
	CONSTRAINT "replies_to_groups_group_id_reply_id_pk" PRIMARY KEY("group_id","reply_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews_to_groups" (
	"group_id" text NOT NULL,
	"review_id" text NOT NULL,
	CONSTRAINT "reviews_to_groups_group_id_review_id_pk" PRIMARY KEY("group_id","review_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business_group_reviews" ADD CONSTRAINT "business_group_reviews_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business_group_reviews" ADD CONSTRAINT "business_group_reviews_businessId_businesses_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_groups" ADD CONSTRAINT "comments_to_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_to_groups" ADD CONSTRAINT "comments_to_groups_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "replies_to_groups" ADD CONSTRAINT "replies_to_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "replies_to_groups" ADD CONSTRAINT "replies_to_groups_reply_id_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."replies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_to_groups" ADD CONSTRAINT "reviews_to_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_to_groups" ADD CONSTRAINT "reviews_to_groups_review_id_business_group_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."business_group_reviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
