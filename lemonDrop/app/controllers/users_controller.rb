# Pushes everything from applicationController to UsersController
class UsersController < ApplicationController
  before_action :authenticate, except: [:new, :create]
  # User profile page
  def show
    #binding.pry
    # @posts = Post.find_by(user_id: params[:id])
    @user = User.find(params[:id])
    # Limits three posts and shows most recent
    @posts = Post.where({user_id: params[:id]}).limit(3).reverse
    # This allows us to use Oath authenication
    keys = Rails.application.secrets
    # Refencing the secrets
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key = keys[:twitter_key]
      config.consumer_secret = keys[:twitter_secret]
      config.access_token = keys[:access_token]
      config.access_token_secret = keys[:access_secret]
    end

    @tweets = client.user_timeline(@user[:twitter_handle]).take(3).each do |tweet|
      tweet.text
    end

    # passing through the information about the user and also our authenticity token and form
    if request.xhr?
      @controller = {
        :user => @user,
        :form => {
          :action => user_path,
          :csrf_param => request_forgery_protection_token,
          :csrf_token => form_authenticity_token
        }
      }
      render :json => @controller
    else
      @controller = {
        :user => @user, :form => {:action => user_path}
      }
    end
  end

  # Create a new user profile and login
  def create
    @user = User.create(create_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to @user
    else
      # If creation fails, redirect to login page
      render template: "sessions/new"
    end
  end

  # Update a user and return the updated user
  def update
    @user = User.find(session[:user_id])
    @user.update(user_params)
    render :json => @user
  end

  # protects things being entered into the database
  private
  def create_params
    params.require(:user).permit(:first, :last, :email, :password, :confirm_password)
  end

  def user_params
    params.require(:user).permit(:first, :last, :email, :location, :picture, :github, :linkedin, :facebook, :quote, :bio, :skill_primary, :skill_secondary, :personal_link, :twitter_handle)
  end

end
