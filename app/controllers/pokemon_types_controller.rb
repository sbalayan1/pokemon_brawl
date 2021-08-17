class PokemonTypesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon_types = PokemonType.all
        render json: pokemon_types
    end 

    def show
        pokemon_type = PokemonType.find(params[:id])
        render json: pokemon_type 
    end 

    def create 
        pokemon_type = PokemonType.create!(type_params)
        render json: pokemon_type
    end 

    private

    def type_params
        params.permit(:pokemon_id, :type_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "PokemonType not Found"}, status: :not_found
    end
end
