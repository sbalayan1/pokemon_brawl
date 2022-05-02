class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        session[:user_id] = user.id
        render json: user
    
        # user = User.find_by(username: params[:username])
        # if user && user.authenticate(params[:password])
        #     session[:init] = true
        #     session[:user_id] = user.id
        #     render json: user, status: :created
        # else 
        #     render json: {errors: "Invalid username or password"}, status: :unauthorized
        # end 
    end 

    # def index
    #     session[:session_hello] ||= "World"
    #     cookies[:cookies_hello] ||= "World"
    #     render json: { session: session, cookies: cookies.to_hash }
    # end 

    def destroy 
        session.delete :user_id
        head :no_content
    end 
end
