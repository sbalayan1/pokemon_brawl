# require 'pry'
require 'open-uri'
require 'net/http'
require 'json'
# require 'awesome_print'


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

    # url =  'https://pokeapi.co/api/v2/pokemon?limit=151'
    # uri = URI.parse(url)
    # response = Net::HTTP.get_response(uri)
    # json_response = JSON.parse(response.body)

    def self.get_all_pokemon
        url =  'https://pokeapi.co/api/v2/pokemon?limit=151'
        uri = URI.parse(url)
        response = Net::HTTP.get_response(uri)
        pokemon_list = JSON.parse(response.body)
        pokemon_list.each do |pokemon|
            puts pokemon
        end 
    end 
end
