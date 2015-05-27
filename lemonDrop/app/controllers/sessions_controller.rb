class SessionsController < ApplicationController
  
  def new
    if session[:user_id]
      redirect_to posts_path 
    else
      @user = User.new
    end
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to @user
    else
      flash[:error] = "Incorrect Username or password"
      redirect_to(login_path)
    end
  end

  def destroy
    reset_session
    redirect_to(login_path)
  end

end