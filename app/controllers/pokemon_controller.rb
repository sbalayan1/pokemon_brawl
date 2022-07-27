class PokemonController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon = Pokemon.get_all_pokemon_urls
        render json: pokemon
    end

    def show
        pokemon = Pokemon.new().get_pokemon(params[:id])
        render json: pokemon
    end 

    def front_sprite 
        front_image_url = Pokemon.new().get_pokemon_front_image(params[:id])
        render json: front_image_url
    end 

    def back_sprite
        back_image_url = Pokemon.new().get_pokemon_back_image(params[:id])
        render json: back_image_url
    end 

    def abilities
        abilities = Pokemon.new().get_pokemon_abilities(params[:id])
        render json: abilities
    end 

    def ability
        ability = Pokemon.new().get_pokemon_ability(params[:name])
        render json: ability
    end

    def moves
        moves = Pokemon.new().get_pokemon_moves(params[:id])
        render json: moves
    end 

    def move
        move = Pokemon.new().get_pokemon_move(params[:name])
        render json: move
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
