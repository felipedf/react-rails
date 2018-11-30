require 'rails_helper'

RSpec.describe 'feedback API', type: :request do
  describe '#create' do

    let(:employee1) { create(:user) }
    let(:employee2) { create(:user) }
    let(:feedback_data) do
      {
        owner_id: employee1.id,
        rated_user_id: employee2.id
      }
    end

    context 'when valid request' do

      subject { post '/api/feedbacks', params: { feedback: feedback_data } }
      it 'should return 201 code' do
        subject
        expect(response).to have_http_status(:created)
      end

      it 'should create a feedback into the database' do
        expect{ subject }.to change{ Feedback.count }.by(1)
      end
    end

    context 'when invalid request' do
      let(:feedback_without_owner) do
        {
          rated_user_id: employee2.id
        }
      end
      it 'should return a 400 code' do
       post'/api/feedbacks', params: { feedback: feedback_without_owner }
       expect(response).to have_http_status(:bad_request)
      end
    end
  end

  describe '#update' do
    let(:feedback) { create(:feedback) }
    let(:feedback_new_rating) { {rating: 2} }
    subject { put "/api/feedbacks/#{feedback.id}", params: { feedback: feedback_new_rating } }

    it 'should return status 200' do
      subject
      expect(response).to have_http_status(:ok)
    end
    it 'should update the feedback' do
      expect(feedback.rating).to be_nil

      subject

      expect(Feedback.count).to eq(1)
      expect(Feedback.first.rating).to eq(2)
    end
  end
end