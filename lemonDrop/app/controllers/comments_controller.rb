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

  def update
    @comment_votes = CommentsVote.where(comment_id: params[:id])
    total_votes = CommentsVote.where(comment_id: params[:id], vote: true).length
    exists = false
    @comment_votes.each do |vote|
      if vote[:user_id] == session[:user_id] && vote[:comment_id] == params[:id].to_i && vote[:vote]
        exists = true
        @comment_vote = CommentsVote.find(vote[:id])
      elsif vote[:user_id] == session[:user_id] && vote[:comment_id] == params[:id].to_i && !vote[:vote]
        @comment_vote = CommentsVote.find(vote[:id])
      end
    end
    if exists
      @comment_vote.update(vote: false)
      total_votes -= 1
    elsif @comment_vote
      @comment_vote.update(vote: true)
      total_votes += 1
    else
      CommentsVote.create(comment_id: params[:id], user_id: session[:user_id], vote: true)
      total_votes += 1
    end
    @comment = Comment.find(params[:id])
    @comment.update(vote: total_votes)
    render json: {vote: total_votes}
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
