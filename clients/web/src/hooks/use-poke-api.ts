import { appClient } from "@/utils/rpc-client";
import { useQuery } from "@tanstack/react-query";


export function useFeaturedPokemon() {
    return useQuery({
    queryKey: ["featured-pokemon"],
    queryFn: () => appClient.external.featuredPokemon(),
  });
}