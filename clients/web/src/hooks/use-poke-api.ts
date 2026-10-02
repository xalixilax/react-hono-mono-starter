import { rpc } from "@/utils/rpc-client";
import { useQuery } from "@tanstack/react-query";


export function useFeaturedPokemon() {
  return useQuery({
    queryKey: ["featured-pokemon"],
    queryFn: () => rpc.external.featuredPokemon(),
  });
}