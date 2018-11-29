# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
def seed_users
  users = []
  user_id = 0
  10.times do
    users << Employee.create!(
      name: "test#{user_id}",
      email: "test#{user_id}@test.com",
      password: '123456',
      password_confirmation: '123456'
    )
    user_id = user_id + 1
  end

  users
end

def seed_admin
  User.create!(
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin123',
    admin: true
  )
end

def seed_feedback(users)
  5.times do |i|
    feedback = Feedback.new(
      rating: rand(5),
      pending: false,
    )
    users[i].feedback << feedback
    users[i+2].ratings << feedback
  end
end

def seed_pending_feedback(users)
  5.times do |i|
    feedback = Feedback.new(
      rating: rand(5),
      pending: true,
    )
    users[i].feedback << feedback
    users[i+2].ratings << feedback
  end
end

users = seed_users
seed_feedback(users)
seed_pending_feedback(users)
seed_admin