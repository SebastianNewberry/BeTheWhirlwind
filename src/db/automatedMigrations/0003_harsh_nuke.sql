ALTER TABLE "user_ratings_to_business" DROP CONSTRAINT "user_ratings_to_business_user_id_businesses_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_ratings_to_business" ADD CONSTRAINT "user_ratings_to_business_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
