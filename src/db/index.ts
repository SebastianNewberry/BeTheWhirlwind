// import postgres from "postgres";
// import "dotenv/config";

// export const client = postgres({
//   host: process.env.DATABASE_URL,
//   port: (process.env.DATABASE_PORT || 5432) as number,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
// });

// import * as schema from "./schema";
// import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import {config} from "dotenv"

// let database: PostgresJsDatabase<typeof schema>;
// let pg: ReturnType<typeof postgres>;

// if (env.NODE_ENV === "production") {
//   pg = postgres(env.DATABASE_URL);
//   database = drizzle(pg, { schema });
// } else {
//   if (!(global as any).database!) {
//     pg = postgres(env.DATABASE_URL);
//     (global as any).database = drizzle(pg, { schema });
//   }
//   database = (global as any).database;
// }

// export { database, pg };
import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === "production") {
  pg = postgres(process.env.DATABASE_URL || "");
  database = drizzle(pg, { schema });
} else {
  if (!(global as any).database!) {
    pg = postgres(process.env.DATABASE_URL || "");
    (global as any).database = drizzle(pg, { schema });
  }
  database = (global as any).database;
}

export { database, pg };
