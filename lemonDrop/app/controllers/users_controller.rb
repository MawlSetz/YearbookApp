# Pushes everything from applicationController to UsersController
class UsersController < ApplicationController
  before_action :authenticate, except: [:new, :create]
  # User profile page
  def show 
    @user = User.find(params[:id])
    # Limits three posts and shows most recent
    @posts = Post.where({user_id: params[:id]}).limit(3).reverse
    # This allows us to use Oath authenication
    keys = Rails.application.secrets
    # Refencing the secrets for twitter API
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key = keys[:twitter_key]
      config.consumer_secret = keys[:twitter_secret]
      config.access_token = keys[:access_token]
      config.access_token_secret = keys[:access_secret]
    end
    # passing appropriate tweets to user page
    @tweets = @client.user_timeline(@user[:twitter_handle]).take(3).each do |tweet|
      tweet.created_at
      tweet.text
    end

    @session = session[:user_id]
    # passing through the information about the user and also our authenticity token and form
    if request.xhr?
      @controller = {
        :user => @user,
        :tweets => @tweets,
        :session => @session,
        :form => {
          :action => user_path,
          :csrf_param => request_forgery_protection_token,
          :csrf_token => form_authenticity_token
        }
      }
      render :json => @controller
    else
      @controller = {
        :user => @user,
        :form => {:action => user_path},
        :tweets => @tweets,
        :session => @session
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
