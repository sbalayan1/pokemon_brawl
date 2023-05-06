require 'pry'

class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
   ##before_action :authorize ->>>> authorize method in the application controller is run before any action below is performed. This ensures that we validate the user before letting them perform actions on sensitive data. 

    def index
        if authorize
            render json: User.all, status: :ok
        else
            render json: {errors: ["Unauthorized"]}, status: :unathorized
        end
    end 
    
    ## POST /api/login => json payload with user information is sent to the endpoint triggering the method below. user is created in database
    def create 
        user = User.create!(user_params)
        render json: user, status: :created
    end 

    #this method is for looking up users
    def show
        if authorize
            render json: User.find(params[:id]), status: :ok
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    ## GET '/current_user', to: 'users#show_current_user' => this method is for grabbing the session's current user. 
    def show_current_user
        if authorize
            render json: User.find_by(id: session[:user_id]), status: :ok 
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
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
        ##if we require :user here, the not null clause for password and password confirmation throws an error because we try to create a new user without the password and password confirmation. 

        params.permit(:username, :first_name, :last_name, :email_address, :password, :password_confirmation)
    end 

    def render_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end 

    def render_not_found
        render json: {errors: "User not Found"}, status: :not_found
    end
end
