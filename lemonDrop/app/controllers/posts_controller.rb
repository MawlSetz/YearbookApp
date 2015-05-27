class PostsController < ApplicationController

  def index
    if session[:user_id]
      @posts = Post.all
    else
      redirect_to login_path
    end
  end
  
  def create
    @post = Post.create(post_params)
    if @post.save
      #render json
    else
      #render json
    end
  end

  private
    def post_params
      params.require(:post).permit(:user_id, :vote, :content, :tags)
    end

end
