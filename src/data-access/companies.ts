import { getTableColumns, sql } from "drizzle-orm";
import { database } from "@/db";
import { businesses } from "@/db/schema";

export const searchForBusinesses = async ({
  sqlPoint,
}: {
  sqlPoint: {
    x: Number;
    y: Number;
  };
}) => {
  sql`ST_SetSRID(ST_MakePoint(${sqlPoint.x}, ${sqlPoint.y}), 4326)`;
  return await database
    .select({
      ...getTableColumns(businesses),
      distance: sql`ST_Distance(${businesses.coordinates}, ${sqlPoint})`,
    })
    .from(businesses)
    .orderBy(sql`${businesses.coordinates} <-> ${sqlPoint}`)
    .limit(1);
};
