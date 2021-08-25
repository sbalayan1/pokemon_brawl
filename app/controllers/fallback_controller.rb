class FallbackController < ActionController::Base
    def index
        # React app index page
        render file: Rails.root.join('public/index.html')
    end
end
