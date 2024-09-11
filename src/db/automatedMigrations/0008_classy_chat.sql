ALTER TABLE "businesses" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "state" text;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "coordinates" geometry(point);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spatial_index" ON "businesses" USING gist ("coordinates");--> statement-breakpoint
ALTER TABLE "businesses" DROP COLUMN IF EXISTS "location";--> statement-breakpoint
ALTER TABLE "businesses" DROP COLUMN IF EXISTS "latitude";--> statement-breakpoint
ALTER TABLE "businesses" DROP COLUMN IF EXISTS "longitude";