class FallbackController < ActionController::Base
    def index
        # React app index page
        render '../client/public/index.html'
    end
end
