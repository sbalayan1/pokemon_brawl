class MovesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        render json: Move.all, status: :ok
    end

    def show
        move = Move.all.find(params[:id])
        render json: move, status: :ok
    end

    def create
        move = Move.create!(move_params)
        render json: move, status: :created
    end


    private

    def move_params
        params.permit(:name, :power_points, :power, :description)
    end

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Move not Found"}, status: :not_found
    end
end