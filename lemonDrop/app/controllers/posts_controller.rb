# Pushes everything from applicationController to PostsController
class PostsController < ApplicationController
  # Load all posts into home page
  def index
    if request.xhr?
      @posts = Post.where("tags LIKE ?", "%#{params[:search]}%").map do |post|
        {post: post, comments: post.comments.all}
      end
      render :json => {:posts => @posts}
    end

    if session[:user_id]
      @posts = Post.all.map do |post|
        comments = post.comments.all.map do |comment|
          comment_voted = false
          comment_votes = CommentsVote.where(comment_id: comment[:id], vote: true)
          comment_votes.each do |vote|
            puts "XXXXXXXXXXXXXXXXX"
            puts vote[:user_id]
            puts session[:user_id]
            puts vote[:comment_id]
            puts comment[:id]
            if vote[:user_id] == session[:user_id] && vote[:comment_id] == comment[:id]
              comment_voted = true
            end
          end
          comment = comment.as_json
          comment[:user_voted] = comment_voted
          comment
        end
        {post: post, comments: comments}
      end
      @controller = {
        :posts => @posts,
        :users => User.all,
        :session => session[:user_id],
        :form => {
          :action => posts_path,
          :csrf_param => request_forgery_protection_token,
          :csrf_token => form_authenticity_token
        }
      }
      @users = User.all
      @users = {users: @users.sample(4)}
    else
      # If user is not signed in, redirect to sign in page
      redirect_to login_path
    end
  end
  # Create a new post
  def create
    @post = Post.create(user_id: session[:user_id], content: post_params[:content], tags: post_params[:tags])
    if @post.save
      @posts = Post.all.map do |post|
        {post: post, comments: post.comments.all}
      end
      render :json => {:posts => @posts}
    else
      redirect_to posts
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if session[:user_id] == @post.user_id
      @post.destroy
      @posts = Post.all.map do |post|
        {post: post, comments: post.comments.all}
      end
      render :json => {:posts => @posts}
    end
  end

# protects things being entered into the database
  private
    def post_params
      params.require(:post).permit(:user_id, :vote, :content, :tags)
    end

end
