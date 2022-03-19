require 'open-uri'
require 'net/http'
require 'json'


class Move < ApplicationRecord
    has_many :pokemon_moves
    has_many :pokemons, through: :pokemon_moves

    def get_moves
        url = 'https://pokeapi.co/api/v2/move?limit=844'
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri)
        JSON.parse(response.body)['results']
    end 
end
