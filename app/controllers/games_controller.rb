class GamesController < ApplicationController
  def index
    @user = @current_user
    raise 'hell'
  end
end
