class PokemonTeamsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
 
    def create
        pokemon_team = PokemonTeam.create!(pokemon_team_params)
        render json: pokemon_team
    end 

    def update
        pokemon_team = PokemonTeam.find(params[:id])
        pokemon_team.update!(pokemon_team_params)
        render json: pokemon_team
    end

    private 

    def pokemon_team_params
        params.permit(:pokemon_id, :team_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "PokemonTeam not Found"}, status: :not_found
    end
end
