class UsersController < ApplicationController
  before_action :authenticate, except: [:new, :create]
  # User profile page
  def show
    @user = User.find(params[:id])
    keys = Rails.application.secrets
    client = Twitter::REST::Client.new do |config|
        config.consumer_key = keys[:twitter_key]
        config.consumer_secret = keys[:twitter_secret]
        config.access_token = keys[:access_token]
        config.access_token_secret = keys[:access_secret]
      end
      puts "searching"
      client.user_timeline('cnn').map do |tweet|
        puts tweet.text
      end

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
