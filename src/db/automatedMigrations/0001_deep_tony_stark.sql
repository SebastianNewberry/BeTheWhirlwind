ALTER TABLE "businesses_to_categories" DROP CONSTRAINT "businesses_to_categories_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "businesses_to_categories" DROP CONSTRAINT "businesses_to_categories_business_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "businesses_to_tags" DROP CONSTRAINT "businesses_to_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "businesses_to_tags" DROP CONSTRAINT "businesses_to_tags_business_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "group_ratings_to_business" DROP CONSTRAINT "group_ratings_to_business_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "group_ratings_to_business" DROP CONSTRAINT "group_ratings_to_business_business_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "group_ratings_to_post" DROP CONSTRAINT "group_ratings_to_post_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "group_ratings_to_post" DROP CONSTRAINT "group_ratings_to_post_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "user_ratings_to_business" DROP CONSTRAINT "user_ratings_to_business_business_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "user_ratings_to_business" DROP CONSTRAINT "user_ratings_to_business_user_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "user_ratings_to_post" DROP CONSTRAINT "user_ratings_to_post_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "user_ratings_to_post" DROP CONSTRAINT "user_ratings_to_post_user_id_businesses_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_groups" DROP CONSTRAINT "users_to_groups_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_groups" DROP CONSTRAINT "users_to_groups_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businesses_to_categories" ADD CONSTRAINT "businesses_to_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businesses_to_categories" ADD CONSTRAINT "businesses_to_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businesses_to_tags" ADD CONSTRAINT "businesses_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businesses_to_tags" ADD CONSTRAINT "businesses_to_tags_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_ratings_to_business" ADD CONSTRAINT "group_ratings_to_business_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_ratings_to_business" ADD CONSTRAINT "group_ratings_to_business_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_ratings_to_post" ADD CONSTRAINT "group_ratings_to_post_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_ratings_to_post" ADD CONSTRAINT "group_ratings_to_post_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_ratings_to_business" ADD CONSTRAINT "user_ratings_to_business_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_ratings_to_business" ADD CONSTRAINT "user_ratings_to_business_user_id_businesses_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_ratings_to_post" ADD CONSTRAINT "user_ratings_to_post_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_ratings_to_post" ADD CONSTRAINT "user_ratings_to_post_user_id_businesses_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
