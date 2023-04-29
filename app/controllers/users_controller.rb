require 'pry'

class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    # rescue_from :authorize, with: :unauthorized
   ##before_action :authorize ###authorize method in the application controller is run before any action below is performed. This ensures that we validate the user before letting them perform actions on sensitive data. 

    def index
        render json: authorize ? User.all : {errors: ["Unauthorized"]}, status: :unauthorized
        # render json: @current_user ? User.all : {errors: ["Unauthorized"]}, status: :unauthorized
    end 


    ## POST /api/login => json payload with user information is sent to the endpoint triggering the method below. user is created in database, user's id is added to the session
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end 

    #this method is for looking up users
    def show
        render json: authorize ? User.find(params[:id]) : {errors: ["Unauthorized"]}, status: :unauthorized
    end

    #this method is for grabbing the session's current user. 
    def show_current_user
        render json: authorize ? User.find_by(id: session[:user_id]) : {errors: ["Unauthorized"]}, status: :unauthorized
    end 

    def destroy
        if authorize
            user = User.find(params[:id])
            user.destroy
            head :no_content
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :first_name, :last_name, :password, :email_address, :password_confirmation)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "User not Found"}, status: :not_found
    end
end
