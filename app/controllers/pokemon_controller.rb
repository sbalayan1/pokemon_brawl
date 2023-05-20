# require_relative './concerns/fetch'
require 'pry'

class PokemonController < ApplicationController
    # extend Fetch::ClassMethods

    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    # before_action :authorize -> turned off for nwo

    def index
        pokemon = Pokemon.all
        render json: pokemon, status: :ok
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, status: :ok
    end 

    def update
        poke = Pokemon.find(params[:id])
        poke.update!(pokemon_params)
        render json: poke, status: :accepted
    end

    def create
        pokemon = Pokemon.create!(pokemon_params)
        render json: pokemon, status: :created
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        head :no_content, status: :ok
    end 

    private 

    def pokemon_params
        params.require(:pokemon).permit(:name, :front, :back, :user_id, :hp, :attack, :defense, :speed)
    end 

    def render_invalid(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end 

    def render_not_found
        render json: { errors: "Pokemon not Found" }, status: :not_found
    end

 
end
