class PokemonAbilitiesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon_abilities = PokemonAbility.all
        render json: pokemon_abilities
    end 

    def show
        pokemon_ability = PokemonAbility.find(params[:id])
        render json: pokemon_ability 
    end 

    def create 
        pokemon_ability = PokemonAbility.create(type_params)
        render json: pokemon_ability
    end 

    private

    def type_params
        params.permit(:pokemon_id, :ability_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "PokemonAbility not Found"}, status: :not_found
    end
end
