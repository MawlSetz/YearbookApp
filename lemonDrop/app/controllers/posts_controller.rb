# Pushes everything from applicationController to PostsController
class PostsController < ApplicationController
  # Load all posts into home page
  def index
    if request.xhr?
      @posts = Post.where("tags LIKE ?", "%#{params[:search]}%").map do |post|
        # Grab comments for post, check to see how the user has voted on this comment
        comments = Comment.where(post_id: post[:id]).map do |comment|
          comment_voted = false
          comment_votes = CommentsVote.where(comment_id: comment[:id], vote: true)
          comment_votes.each do |vote|
            if vote[:user_id] == session[:user_id] && vote[:comment_id] == comment[:id]
              comment_voted = true
            end
          end
          comment = comment.as_json
          comment[:user_voted] = comment_voted
          comment
        end
        post_voted = false
        post_votes = PostsVote.where(post_id: post[:id], vote: true)
        post_votes.each do |vote|
          if vote[:user_id] == session[:user_id] && vote[:post_id] == post[:id]
            post_voted = true
          end
        end
        post = post.as_json
        post[:user_voted] = post_voted
        {post: post, comments: comments}
      end
      render :json => {:posts => @posts}
    end

    if session[:user_id]
      @posts = Post.all.map do |post|
        comments = post.comments.all.map do |comment|
          comment_voted = false
          comment_votes = CommentsVote.where(comment_id: comment[:id], vote: true)
          comment_votes.each do |vote|
            if vote[:user_id] == session[:user_id] && vote[:comment_id] == comment[:id]
              comment_voted = true
            end
          end
          comment = comment.as_json
          comment[:user_voted] = comment_voted
          comment
        end
        post_voted = false
        post_votes = PostsVote.where(post_id: post[:id], vote: true)
        post_votes.each do |vote|
          if vote[:user_id] == session[:user_id] && vote[:post_id] == post[:id]
            post_voted = true
          end
        end
        post = post.as_json
        post[:user_voted] = post_voted
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
    @post = Post.create(user_id: session[:user_id], content: post_params[:content], tags: post_params[:tags], vote: 0)
    if @post.save
      @posts = Post.all.map do |post|
        {post: post, comments: post.comments.all}
      end
      render :json => {:posts => @posts}
    else
      redirect_to posts
    end
  end

  def update
    @post_votes = PostsVote.where(post_id: params[:id])
    total_votes = PostsVote.where(post_id: params[:id], vote: true).length
    # if a true vote in the table exists for this user-post relationship, exists will be set to true
    exists = false
    @post_votes.each do |vote|
      if vote[:user_id] == session[:user_id] && vote[:post_id] == params[:id].to_i && vote[:vote]
        exists = true
        @post_vote = PostsVote.find(vote[:id])
      elsif vote[:user_id] == session[:user_id] && vote[:post_id] == params[:id].to_i && !vote[:vote]
        @post_vote = PostsVote.find(vote[:id])
      end
    end
    if exists
      @post_vote.update(vote: false)
      total_votes -= 1
    elsif @post_vote
      @post_vote.update(vote: true)
      total_votes += 1
    else
      PostsVote.create(post_id: params[:id], user_id: session[:user_id], vote: true)
      total_votes += 1
    end
    @post = Post.find(params[:id])
    @post.update(vote: total_votes)
    @comments = Comment.where(post_id: @post[:id])
    render json: {vote: total_votes, comments: @comments}
  end

  def destroy
    @post = Post.find(params[:id])
    if session[:user_id] == @post.user_id
      @post.destroy
      @posts = Post.all.map do |post|
        {post: post, comments: post.comments.all}
      end
    end
    render :json => {:posts => @posts}
  end

# protects things being entered into the database
  private
    def post_params
      params.require(:post).permit(:user_id, :vote, :content, :tags)
    end
end
