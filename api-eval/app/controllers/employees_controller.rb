class EmployeesController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    binding.pry
    render json: User.create!(employee_params)
  end

  def destroy
    render json: User.where(id: params[:id].split(',')).destroy_all
  end

  private

  def employee_params
    params.permit(:name, :email, :password)
  end
end
