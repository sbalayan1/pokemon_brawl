class StatsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        stats = Stat.all
        render json: stats
    end

    def show
        stat = stat.find(params[:id])
        render json: stat
    end 

    def create
        stat = stat.create!(stat_params)
        render json: stat
    end 

    private 


    def stat_params
        params.permit(:hp, :attack, :defense, :speed, :sp_attack, :sp_defense)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Stat not Found"}, status: :not_found
    end

end
