# pushes everything from controller to comment from activeRecord
class Comment < ActiveRecord::Base
	belongs_to :post, inverse_of: :comments
end
