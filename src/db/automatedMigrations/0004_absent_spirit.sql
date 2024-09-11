CREATE TABLE IF NOT EXISTS "comment_relations" (
	"comment_id" text NOT NULL,
	"related_comment_id" text NOT NULL,
	CONSTRAINT "comment_relations_comment_id_related_comment_id_pk" PRIMARY KEY("comment_id","related_comment_id")
);
--> statement-breakpoint
DROP TABLE "replies_to_groups";--> statement-breakpoint
DROP TABLE "replies";--> statement-breakpoint

DO $$ BEGIN
 ALTER TABLE "comment_relations" ADD CONSTRAINT "comment_relations_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_relations" ADD CONSTRAINT "comment_relations_related_comment_id_comments_id_fk" FOREIGN KEY ("related_comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
