class ApplicationController < ActionController::API
    include ActionController::Cookies

    def current_user 
        user = User.find_by(id: session[:user_id])
    end 
end
