class FeedbacksController < ApplicationController
  def index
    employee_feedbacks = Employee.find(params[:employee_id]).feedback
    render json: employee_feedbacks
  end

  def update
    binding.pry
    feedback = Feedback.find(params[:id])
    feedback.update!(rating: params[:rating], pending: false)
    render json: feedback
  end
end
