class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    user = User.create user_params
    # binding.pry
    if user.persisted?
      # user successfully created, redirect to profile page for this user
      session[:user_id] = user.id
      redirect_to games_path
    else
      # error creating user (probably a validation error)
      flash[:errors] = user.errors.full_messages
      redirect_to users_new_path
    end
  end

  def edit
    @user = User.find params[:id]
  end

  def update
  end

  def show
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:user_name, :password)
  end


end
