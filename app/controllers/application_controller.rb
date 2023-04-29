require 'pry'

class ApplicationController < ActionController::API
    include ActionController::Cookies
    # before_action :authorize

    private

    # def current_user 
    #     user = User.find_by(id: session[:user_id])
    #     # @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
    # end


    def authorize
        @current_user = User.find_by(id: session[:user_id])
        return @current_user ? true : false
    
        # render json: {errors: "Unauthorized"}, status: :unauthorized unless @current_user
    end
end
