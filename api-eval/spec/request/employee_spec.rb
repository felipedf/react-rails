require 'rails_helper'

RSpec.describe 'employee API', type: :request do
  describe '#create' do
    context 'when valid request' do
      let(:user_data) do
        {
          email: 'test@test.com',
          password: '123456'
        }
      end

      subject { post '/api/employees', params: user_data }
      it 'should return 201 code' do
        subject
        expect(response).to have_http_status(:created)
      end

      it 'should create a user into the database' do
        expect{ subject }.to change{ User.count }.by(1)
      end

      context 'when invalid request' do
        let(:user_without_email) do
          {
            password: '123456'
          }
        end

        it 'should return a 400 code' do
          post'/api/employees', params: { user: user_without_email }
          expect(response).to have_http_status(:bad_request)
        end
      end
    end

    describe '#destroy' do
      let(:employee1) { create(:user) }
      let(:employee2) { create(:user) }
      subject do
        delete "/api/employees/#{employee1.id}"
      end
      it 'should return status 200' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'should delete the category' do
        employee1
        employee2
        expect{ subject }.to change{ Employee.count }.by(-1)
        expect(User.all).to include(employee2)
        expect(User.all).not_to include(employee1)
        expect(User.count).to eq(1)
      end
    end
  end
end