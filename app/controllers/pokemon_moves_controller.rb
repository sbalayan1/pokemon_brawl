class PokemonMovesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon_moves = PokemonMove.all
        render json: pokemon_moves
    end

    def show
        pokemon_move = PokemonMove.find(params[:id])
        render json: pokemon_move
    end 

    def create
        pokemon_move = PokemonMove.create!(pokemon_move_params)
        render json: pokemon_move
    end 

    private 

    def pokemon_move_params
        params.permit(:pokemon_id, :move_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "PokemonMove not Found"}, status: :not_found
    end

end
