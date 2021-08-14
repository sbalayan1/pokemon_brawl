class TrainersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found


    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemon, :pokemon_teams]
    end 

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, include: [:pokemon, :pokemon_team]
    end

    def create
        trainer = Trainer.create!(trainer_params)
        render json: trainer
    end 

    private 
    
    def trainer_params
        params.permit(:name, :gender, :img_url, :user_id)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Trainer not Found"}, status: :not_found
    end
end
