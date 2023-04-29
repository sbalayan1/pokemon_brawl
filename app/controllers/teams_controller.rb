class TeamsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    before_action :authorize

    def index
        teams = Team.all
        render json: teams, status: :ok
    end 

    def show
        team = Team.find(params[:id])
        render json: team, status: :ok
    end

    def create
        team = Team.create!(team_params)
        render json: team, status: :created
    end

    def destroy
        team = Team.find(params[:id])
        team.destroy
        render json: team, status: :ok
    end

    private 
    
    def team_params
        params.permit(:name, :user_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Team not found"}, status: :not_found
    end
end
