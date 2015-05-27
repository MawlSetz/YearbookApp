class SessionsController < ApplicationController
  # Sign in page
  def new
    if session[:user_id]
      redirect_to posts_path
    else
      @user = User.new
    end
  end
  # Create a new session upon user login
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to @user
    else
      # If sign in fails, redirect to login page and display an error
      flash[:error] = "Incorrect Username or password"
      redirect_to(login_path)
    end
  end
  # Logout of current session
  def destroy
    reset_session
    redirect_to(login_path)
  end

end
