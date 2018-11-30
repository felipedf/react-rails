class FeedbacksController < ApplicationController
  def index
    employee_feedbacks = Employee.find(params[:employee_id]).feedback
    render json: employee_feedbacks
  end

  def create
    begin
      render json: Feedback.create!(feedback_params), status: :created
    rescue => err
      render json: err, status: :bad_request
    end
  end

  def update
    feedback = Feedback.find(params[:id])
    begin
      feedback.update!(rating: feedback_params[:rating], pending: false)
      render json: feedback
    rescue => err
      render json: err, status: :bad_request
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:owner_id, :rated_user_id, :rating)
  end
end
