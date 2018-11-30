FactoryGirl.define do
  factory :feedback do
    association :owner, factory: :user, email: 'ab@ab.com', password: '123456'
    association :rated_user, factory: :user, email: 'a3b@ab.com', password: '123456'
  end
end