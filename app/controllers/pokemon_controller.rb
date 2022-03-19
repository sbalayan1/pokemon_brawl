class PokemonController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon = Pokemon.get_all_pokemon
        render json: pokemon
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end 

    def create
        pokemon = Pokemon.create!(pokemon_params)
        render json: pokemon
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        head :no_content
    end 

    private 


    def pokemon_params
        params.permit(:name, :level, :wins, :front_image, :back_image)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Pokemon not Found"}, status: :not_found
    end
end
