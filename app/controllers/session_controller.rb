class SessionController < ApplicationController

    def new

    end

    def create
      # binding.pry
      user = User.find_by user_name: params[:user_name]

      if user.present? && user.authenticate( params[:password] )
        # successful login
        # create a cookie to store a session, and keep track of the user ID
        session[:user_id] = user.id
        redirect_to "/games"
      else
        # bad credentials/unsuccessful login
        flash[:error] = "Invalid username or password"
        redirect_to login_path
      end
    end

    def destroy
      session[:user_id] = nil
      redirect_to root_path
    end

end
