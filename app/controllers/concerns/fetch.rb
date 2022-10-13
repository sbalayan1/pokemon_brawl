require 'open-uri'
require 'net/http'
require 'json'

module Fetch
    module ClassMethods
        def fetch_pokemon id
            url = "https://pokeapi.co/api/v2/pokemon/#{id}"
            uri = URI.parse(url)
            response = Net::HTTP.get_response(uri)
            poke = JSON.parse(response.body)

            pokemon_object = {
                'id': id.to_i,
                'level': 10,
                'name': poke['name'],
                'front_image': poke['sprites']['front_shiny'],
                'back_image': poke['sprites']['back_shiny'],
                'abilities': poke['abilities'],
                'types': poke['types'].map {|t| t['type']['name']},
                'moves': poke['moves'].map {|t| t['move']},
                'stats': {
                    poke['stats'][0]['stat']['name'] => poke['stats'][0]['base_stat'],
                    poke['stats'][1]['stat']['name'] => poke['stats'][1]['base_stat'],
                    poke['stats'][2]['stat']['name'] => poke['stats'][2]['base_stat'],
                    poke['stats'][3]['stat']['name'] => poke['stats'][3]['base_stat'],
                    poke['stats'][4]['stat']['name'] => poke['stats'][4]['base_stat'],
                    poke['stats'][5]['stat']['name'] => poke['stats'][5]['base_stat']
                }
            }
        end
    end
end