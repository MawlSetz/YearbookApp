# Pushes everything from applicationController to PostsController
class PostsController < ApplicationController
  # Load all posts into home page
  def index
    if session[:user_id]
      @posts = Post.all
    else
      # If user is not signed in, redirect to sign in page
      redirect_to login_path
    end
  end
  # Create a new post
  def create
    @post = Post.create(post_params)
    if @post.save
      #render json
    else
      #render json
    end
  end

# protects things being entered into the database
  private
    def post_params
      params.require(:post).permit(:user_id, :vote, :content, :tags)
    end

end
