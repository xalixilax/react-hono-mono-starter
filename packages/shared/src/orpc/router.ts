import { os } from "@orpc/server";
import createClient from "openapi-fetch";
import { z } from "zod";

import type { paths } from "../@types/poke-api";

const featuredPokemonOutputSchema = z.object({
  artworkUrl: z.union([z.string().url(), z.null()]),
  height: z.number().int().nonnegative(),
  id: z.number().int().positive(),
  name: z.string().min(1),
  weight: z.number().int().nonnegative(),
});

const pokeApiPokemonResponseSchema = z.object({
  height: z.number().int().nonnegative(),
  id: z.number().int().positive(),
  name: z.string().min(1),
  sprites: z.object({
    front_default: z.union([z.string().url(), z.null()]).optional(),
  }),
  weight: z.number().int().nonnegative(),
});

const pokeApiClient = createClient<paths>({
  baseUrl: "https://pokeapi.co",
});

const FEATURED_POKEMON_ID = "pikachu";

export const featuredPokemon = os.output(featuredPokemonOutputSchema).handler(async () => {
  const { data, error } = await pokeApiClient.GET("/api/v2/pokemon/{id}/", {
    params: {
      path: {
        id: FEATURED_POKEMON_ID,
      },
    },
  });

  if (error) {
    throw new Error("Failed to fetch the featured Pokemon");
  }

  const payload = pokeApiPokemonResponseSchema.parse(data);

  return featuredPokemonOutputSchema.parse({
    artworkUrl: payload.sprites.front_default ?? null,
    height: payload.height,
    id: payload.id,
    name: payload.name,
    weight: payload.weight,
  });
});

export const appRouter = {
  external: {
    featuredPokemon,
  },
};

export type AppRouter = typeof appRouter;
export type FeaturedPokemon = z.infer<typeof featuredPokemonOutputSchema>;
