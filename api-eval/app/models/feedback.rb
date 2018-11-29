class Feedback < ApplicationRecord
  belongs_to :owner, :class_name => 'User'
  belongs_to :rated_user, :class_name => 'User'

  delegate :name, to: :rated_user_name

  def rated_user_name
    rated_user.name
  end

  def as_json(options = { })
    h = super(options)
    h[:rated_user_name] = rated_user_name

    h
  end
end
