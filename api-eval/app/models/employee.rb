class Employee < User
  has_many :feedback, :class_name => 'Feedback', :foreign_key => 'owner_id'
  has_many :ratings, :class_name => 'Feedback', :foreign_key => 'rated_user_id'
end