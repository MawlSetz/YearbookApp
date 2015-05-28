# Pushes everything from applicationController to CommentsController
class CommentsController < ApplicationController
  # Will create a new comment and save it to the database
  def create
    @comment = Comment.create(comment_params)
    if @comment.save
      #render json
    else
      #render json
    end
  end


  # protects things being entered into the database
  private
    def comment_params
      params.require(:comment).permit(:post_id, :vote, :content, :user_id)
    end

end
