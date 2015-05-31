# Pushes everything from applicationController to CommentsController
class CommentsController < ApplicationController
  # Will create a new comment and save it to the database
  def create
    @comment = Comment.create(user_id: session[:user_id], text: comment_params[:text], post_id: comment_params[:post_id])
    if @comment.save
      @comments = Comment.where(post_id: comment_params[:post_id])
      render :json => {comments: @comments}
    else
      #render json
    end
  end

  def destroy
    puts params
    @comment = Comment.find(params[:id])
    if session[:user_id] == @comment[:user_id]
      post_id = @comment[:post_id]
      @comment.destroy
      @comments = Comment.where(post_id: post_id)
      render :json => {comments: @comments}
    end
  end

  # protects things being entered into the database
  private
    def comment_params
      params.require(:comment).permit(:post_id, :vote, :text, :user_id)
    end

end
