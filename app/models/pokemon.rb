# require 'pry'
require 'open-uri'
require 'net/http'
require 'json'
# require 'awesome_print'
# id = 10
# url = "https://pokeapi.co/v2/pokemon/#{id}"
# uri = URI.parse(url)
# response = Net::HTTP.get_response(uri)
# ap JSON.parse(response.body)



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
        url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri)
        pokemon_list = JSON.parse(response.body)
        pokemon_urls = pokemon_list['results'].map do |pokemon|
            pokemon['url']
        end
    end

    def get_pokemon id
        url = "https://pokeapi.co/api/v2/pokemon/#{id}"
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri)
        pokemon = JSON.parse(response.body)
        pokemon
    end

    def get_pokemon_front_image id
        pokemon = get_pokemon id
        pokemon['sprites']['front_shiny']
    end 

    def get_pokemon_back_image id
        pokemon = get_pokemon id
        pokemon['sprites']['back_shiny']
    end 
end
