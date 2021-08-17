class AbilitiesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        abilities = Ability.all
        render json: abilities 
    end 

    def show
        ability = Ability.find(params[:id])
        render json: ability 
    end 

    def create 
        ability = Ability.create(ability_params)
        render json: ability
    end 

    private

    def ability_params
        params.permit(:name, :description)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Ability not Found"}, status: :not_found
    end
end
