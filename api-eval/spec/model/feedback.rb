require 'rails_helper'

RSpec.describe Feedback, type: :model do
  describe '#validations' do
    it 'should test that the factory is valid' do
      expect(build(:feedback)).to be_valid
    end

    it 'should validate the presence of an owner' do
      feedback = build :feedback, owner_id: ''
      expect(feedback).not_to be_valid
      expect(feedback.errors.messages[:owner]).to include('must exist')
    end

    it 'should validate the presence of a rated_user' do
      feedback = build :feedback, rated_user_id: ''
      expect(feedback).not_to be_valid
      expect(feedback.errors.messages[:rated_user]).to include('must exist')
    end
  end

  describe '#as_json' do
    it 'should return the rated_user_name' do
      feedback = build :feedback
      expect(feedback.as_json[:rated_user_name]).not_to be_nil
    end
  end
end
