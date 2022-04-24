require 'open-uri'
require 'net/http'
require 'json'

class Pokemon < ApplicationRecord
    has_many :pokemon_teams 
    has_many :trainers, through: :pokemon_teams

    has_many :pokemon_moves, dependent: :destroy
    has_many :moves, through: :pokemon_moves

    has_many :pokemon_stats, dependent: :destroy
    has_many :stats, through: :pokemon_stats

    has_many :pokemon_abilities
    has_many :abilities, through: :pokemon_abilities

    has_many :pokemon_types
    has_many :types, through: :pokemon_types

    validates :name, presence: true
    validates :level, presence: true
    validates :wins, presence: true
    validates :front_image, presence: true
    validates :back_image, presence: true

    def self.get_all_pokemon_urls
        count = 0
        url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri)
        pokemon_list = JSON.parse(response.body)
        pokemon_urls = pokemon_list['results'].map do |pokemon|
            count += 1
            pokemon_object = {
                'id': count,
                'name': pokemon['name'],
                'url': pokemon['url']
            }
        end
    end

    def get_pokemon id
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
            'moves': poke['moves'].map {|t| t['move']}
        }
    end

    def get_pokemon_front_image id
        pokemon = get_pokemon id
        pokemon[:front_image]
    end 

    def get_pokemon_back_image id
        pokemon = get_pokemon id
        pokemon[:back_image]
    end 

    def get_pokemon_ability id
        pokemon = get_pokemon id
        pokemon[:abilities].map do |pokemon|
            url = pokemon['ability']['url']
            uri = URI.parse(url)
            response = Net::HTTP.get_response(uri)
            ability = JSON.parse(response.body)
            ability_description = ability['flavor_text_entries'][0]['flavor_text']
            effect_description = ability['effect_entries'].filter {|e| e['language']['name'] == 'en'}[0]['short_effect']

            ability_object = {
                'name': pokemon['ability']['name'],
                'ability': ability_description,
                'effect': effect_description
            }
        end
    end                         

    def get_pokemon_moves id
        pokemon = get_pokemon id
        pokemon[:moves]
    end 
end
