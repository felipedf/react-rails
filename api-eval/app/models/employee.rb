class Employee < User
  has_many :feedback, :class_name => 'Feedback', :foreign_key => 'owner_id', dependent: :delete_all
  has_many :ratings, :class_name => 'Feedback', :foreign_key => 'rated_user_id', dependent: :delete_all


  scope :employees, ->{ where(admin: false) }

  def rating
    all_ratings = ratings.where(pending: false)
    return 0 if all_ratings.size == 0

    total_rating = all_ratings.reduce(0) {|result, r| result + (r.rating || 0) }
    total_rating/all_ratings.size
  end

  def as_json(options = { })
    h = super(options)
    h[:rating] = rating

    h
  end
end