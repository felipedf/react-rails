class Feedback < ApplicationRecord
  belongs_to :owner, :class_name => 'User'
  belongs_to :rated_user, :class_name => 'User'
end
