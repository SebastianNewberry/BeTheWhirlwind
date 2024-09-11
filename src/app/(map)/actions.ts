"use server";

import { searchForBusinessesUseCase } from "@/use-cases/businesses";
import { unauthenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const searchForCompanies = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      location: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const results = await searchForBusinessesUseCase(input.location);

    return results;
  });
