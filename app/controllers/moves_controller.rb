class MovesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        moves = Move.all
        render json: moves
    end

    def show
        move = Move.find(params[:id])
        render json: move
    end 

    def create
        move = Move.create!(move_params)
        render json: move
    end 

    private 

    def move_params
        params.require(:move).permit(:name, :power_points, :description, :power)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Move not Found"}, status: :not_found
    end
end
