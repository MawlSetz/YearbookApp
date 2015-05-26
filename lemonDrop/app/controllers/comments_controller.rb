class CommentsController < ApplicationController
  
  def create
    @comment = Comment.create(comment_params)
    if @comment.save
      #render json
    else
      #render json
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:post_id, :vote, :content, :user_id)
    end

end
