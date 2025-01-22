import { customType } from "@payloadcms/db-postgres/drizzle/pg-core";

export const tsVector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});
