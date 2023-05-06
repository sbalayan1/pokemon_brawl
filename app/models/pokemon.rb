require 'open-uri'
require 'net/http'
require 'json'

class Pokemon < ApplicationRecord
    belongs_to :user
    has_many :pokemon_teams 
    has_many :teams, through: :pokemon_teams
    has_many :pokemon_moves
    has_many :moves, through: :pokemon_moves
    

    validates :name, presence: true, format: { with: /\A[A-z]+\z/, message: "must consist of letters only" }, length: { in: 2..20 }
    validates :user_id, presence: true, numericality: { only_integer: true, greater_than: 0, message: "must consist of numbers only and be an existing user's id" }, length: { in: 1..10 }

    [:front, :back].each do |attribute|
        validates attribute, presence: true, format: { with: /\Ahttps:\/\/raw.githubusercontent.com\/PokeAPI\/sprites\/pokemon\//, message: "url must come from the pokemon api and include https://raw.githubusercontent.com/PokeAPI/sprites/pokemon/"}
    end

    [:hp, :attack, :defense, :speed].each do |attribute|
        validates attribute, presence: true, numericality: { only_integer: true, message: "must consist of integers only" }, length: { in: 1..5, message: "must be between 1 - 5 characters" }
    end

    # def self.get_all_pokemon_urls
    #     url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    #     uri = URI.parse(url)
    #     response = Net::HTTP.get_response(uri)
    #     pokemon_list = JSON.parse(response.body)
    #     count = 1
    #     pokemon_urls = pokemon_list['results'].map do |pokemon|
    #         pokemon_object = {
    #             'id': count,
    #             'name': pokemon['name'],
    #             'url': pokemon['url']
    #         }

    #         count += 1
    #         pokemon_object
    #     end
    # end

    # # def get_pokemon id
    # #     url = "https://pokeapi.co/api/v2/pokemon/#{id}"
    # #     uri = URI.parse(url)
    # #     response = Net::HTTP.get_response(uri)
    # #     poke = JSON.parse(response.body)
        
    # #     pokemon_object = {
    # #         'id': id.to_i,
    # #         'level': 10,
    # #         'name': poke['name'],
    # #         'front_image': poke['sprites']['front_shiny'],
    # #         'back_image': poke['sprites']['back_shiny'],
    # #         'abilities': poke['abilities'],
    # #         'types': poke['types'].map {|t| t['type']['name']},
    # #         'moves': poke['moves'].map {|t| t['move']},
    # #         'stats': {
    # #             poke['stats'][0]['stat']['name'] => poke['stats'][0]['base_stat'],
    # #             poke['stats'][1]['stat']['name'] => poke['stats'][1]['base_stat'],
    # #             poke['stats'][2]['stat']['name'] => poke['stats'][2]['base_stat'],
    # #             poke['stats'][3]['stat']['name'] => poke['stats'][3]['base_stat'],
    # #             poke['stats'][4]['stat']['name'] => poke['stats'][4]['base_stat'],
    # #             poke['stats'][5]['stat']['name'] => poke['stats'][5]['base_stat']
    # #         }
    # #     }
    # # end

    # def get_pokemon_front_image id
    #     pokemon = get_pokemon id
    #     pokemon[:front_image]
    # end 

    # def get_pokemon_back_image id
    #     pokemon = get_pokemon id
    #     pokemon[:back_image]
    # end 

    # def get_pokemon_abilities id
    #     pokemon = get_pokemon id
    #     pokemon[:abilities].map do |pokemon|
    #         url = pokemon['ability']['url']
    #         uri = URI.parse(url)
    #         response = Net::HTTP.get_response(uri)
    #         ability = JSON.parse(response.body)
    #         ability_description = ability['flavor_text_entries'][0]['flavor_text']
    #         effect_description = ability['effect_entries'].filter {|e| e['language']['name'] == 'en'}[0]['short_effect']

    #         ability_object = {
    #             'name': pokemon['ability']['name'],
    #             'ability': ability_description,
    #             'effect': effect_description
    #         }
    #     end
    # end    
    
    # def get_pokemon_ability name
    #     url = "https://pokeapi.co/api/v2/ability/#{name}"
    #     uri = URI.parse(url)
    #     response = Net::HTTP.get_response(uri)
    #     ability = JSON.parse(response.body)
    #     ability_description = ability['flavor_text_entries'][0]['flavor_text']
    #     effect_description = ability['effect_entries'].filter {|e| e['language']['name'] == 'en'}[0]['short_effect']

    #     ability_object = {
    #         'name': ability['name'],
    #         'ability': ability_description,
    #         'effect': effect_description
    #     }
        
    # end 

    # def get_pokemon_moves id
    #     pokemon = get_pokemon id
    #     pokemon[:moves]
    # end 

    # def get_pokemon_move name
    #     url = "https://pokeapi.co/api/v2/move/#{name}"
    #     uri = URI.parse(url)
    #     response = Net::HTTP.get_response(uri)
    #     move = JSON.parse(response.body)
  
    #     move_object = {
    #         'name': move['name'], 
    #         'power': move['power'],
    #         'pp': move['pp'],
    #         'description': move['effect_entries'][0]['short_effect']
    #     }
    # end 
 
end
