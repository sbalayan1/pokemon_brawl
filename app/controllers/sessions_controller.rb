require 'pry'

class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:init] = true
            session[:user_id] = user.id
            #@current_user = user ##sets the current_user variable to the authenticated user. this isn't working
            render json: user, status: :ok
        else 
            render json: {errors: "Invalid username or password"}, status: :unauthorized
        end 
    end 

    def destroy 
        session.delete :user_id
        head :no_content
    end

    private

end
