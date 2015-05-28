# Pushes everything from applicationController to PostsController
class PostsController < ApplicationController
  # Load all posts into home page
  def index
    if session[:user_id]
      @controller = {:posts => Post.all,
      :session => session[:user_id], 
      :form => {
        :action => posts_path, 
        :csrf_param => request_forgery_protection_token,
        :csrf_token => form_authenticity_token
      }
      }
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

  def destroy
    @post = Post.find(params[:id])
    if session[:user_id] == @post.user_id 
      @post.destroy
      render :json => Post.all
    end
  end

    

# protects things being entered into the database
  private
    def post_params
      params.require(:post).permit(:user_id, :vote, :content, :tags)
    end

end
