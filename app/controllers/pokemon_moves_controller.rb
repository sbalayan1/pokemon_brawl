require 'pry'

class PokemonMovesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        render json: PokemonMove.all, status: :ok
    end

    def show
        pokemon_move = PokemonMove.all.find(params[:id])
        render json: pokemon_move, status: :ok
    end

    def create
        pokemon_move = PokemonMove.create!(pokemon_move_params)
        render json: pokemon_move, status: :created
    end

    def update
        pokemon_move = PokemonMove.find(params[:id])
        pokemon_move.update!(pokemon_move_params)
        render json: pokemon_move, status: :accepted
    end

    def destroy
        pokemon_move = PokemonMove.all.find(params[:id])
        pokemon_move.destroy
        head :no_content
    end


    private

    def pokemon_move_params
        params.require(:pokemon_move).permit(:pokemon_id, :move_id)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Pokemon Move not Found"}, status: :not_found
    end
end