"use client";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pageTitleStyles } from "@/styles/common";
import { cn } from "@/lib/utils";
import { useServerAction } from "zsa-react";
import { LoaderButton } from "@/components/loader-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { searchForCompanies } from "./actions";

const searchCitySchema = z.object({
  location: z.string(),
  category: z.string(),
});

export default function SearchPage() {
  const { execute, isPending, error, reset } =
    useServerAction(searchForCompanies);

  const form = useForm<z.infer<typeof searchCitySchema>>({
    resolver: zodResolver(searchCitySchema),
    defaultValues: {
      location: "",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchCitySchema>) {
    execute(values);
  }

  return (
    <div className=" flex flex-col justify-around items-center py-24 mx-auto gap-2">
      <h1 className={cn(pageTitleStyles, "text-center text-black")}>
        Search for Your Favorite Sustainable Businesses
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row justify-center items-end mt-3 p-5 bg-white rounded border gap-1"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Location"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Category"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Uh-oh, we couldn&apos;t log you in</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <LoaderButton
            isLoading={isPending}
            className="w-1/2 m-auto"
            type="submit"
          >
            Search
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
