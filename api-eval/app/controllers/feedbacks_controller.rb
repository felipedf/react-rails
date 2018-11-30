class FeedbacksController < ApplicationController
  def index
    employee_feedbacks = Employee.find(params[:employee_id]).feedback
    render json: employee_feedbacks
  end

  def create
    render json: Feedback.create!(feedback_params)
  end

  def update
    feedback = Feedback.find(params[:id])
    feedback.update!(rating: params[:rating], pending: false)
    render json: feedback
  end

  private

  def feedback_params
    params.require(:feedback).permit(:owner_id, :rated_user_id)
  end
end
