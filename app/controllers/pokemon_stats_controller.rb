class PokemonStatsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon_stats = PokemonStat.all
        render json: pokemon_stats
    end

    def show
        pokemon_stat = PokemonStat.find(params[:id])
        render json: pokemon_stat
    end 

    def create
        pokemon_stat = PokemonStat.create!(pokemon_stat_params)
        render json: pokemon_stat
    end 

    private 

    def pokemon_stat_params
        params.permit(:pokemon_id, :stat_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "PokemonStat not Found"}, status: :not_found
    end
end
