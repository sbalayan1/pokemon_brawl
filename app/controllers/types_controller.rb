class TypesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        types = Type.all
        render json: types
    end 

    def show
        type = Type.find(params[:id])
        render json: type 
    end 

    def create 
        type = Type.create(type_params)
        render json: type
    end 

    private

    def type_params
        params.permit(:name)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "Type not Found"}, status: :not_found
    end
end
