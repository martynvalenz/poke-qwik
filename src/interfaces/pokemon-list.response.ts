export interface PokemonListResponse {
  count:    number;
  next:     string;
  previous: string;
  results:  BasicPokemon[];
}

export interface BasicPokemon {
  name: string;
  url:  string;
}
