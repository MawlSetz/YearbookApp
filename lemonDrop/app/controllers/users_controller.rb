class UsersController < ApplicationController
  before_action :authenticate, except: [:new, :create]
  # User profile page
  def show
    @user = User.find(params[:id])
  end
  # Create a new user profile and login
  def create
    @user = User.create(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to @user
    else
      # If creation fails, redirect to login page
      render template: "sessions/new"
    end
  end

  private
  def user_params
    puts "SLDFJALSJF TEST"
    params.require(:user).permit(:first, :last, :email, :password, :password_confirmation)
  end

end
