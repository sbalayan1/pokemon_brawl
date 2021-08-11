class BattlesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        battles = Battle.all
        render json: battles
    end

    def show
        battle = Battle.find(params[:id])
        render json: battle
    end 

    def create
        battle = Battle.create!(battle_params)
        render json: battle
    end 

    private 


    def battle_params
        params.permit(:trainer_id, :opponent_id, :win_loss)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Battle not Found"}, status: :not_found
    end

end
