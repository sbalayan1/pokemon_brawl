class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def index
        user = User.all
        render json: user 
    end 

    def show
        user = User.find_by(id: session[:user_id])
        user ? (render json: user) :  (render json: {error: "Not authorized"}, status: :unauthorized)
    end 


    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end 

    private

    def user_params
        params.permit(:username, :first_name, :last_name, :password, :email_address, :age, :password_confirmation)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "User not Found"}, status: :not_found
    end
end
