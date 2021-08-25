class FallbackController < ActionController::Base
    def index
        # React app index page
        render template: '../client/public/index.html'
    end
end
