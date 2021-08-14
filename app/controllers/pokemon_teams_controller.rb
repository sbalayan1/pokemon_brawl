class PokemonTeamsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        pokemon_teams = PokemonTeam.all
        render json: pokemon_teams, include: [:trainer, :pokemon]
    end

    def show
        pokemon_team = PokemonTeam.find(params[:id])
        render json: pokemon_team
    end 

    def create
        pokemon_team = PokemonTeam.create!(pokemon_team_params)
        render json: pokemon_team
    end 

    private 

    def pokemon_team_params
        params.permit(:pokemon_id, :trainer_id, :team_member)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "PokemonTeam not Found"}, status: :not_found
    end
end
