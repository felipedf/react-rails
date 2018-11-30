class EmployeesController < ApplicationController
  def index
    render json: Employee.employees
  end

  def show
    render json: Employee.find(params[:id])
  end

  def create
    begin
      employee = Employee.create!(employee_params)
      render json: employee, status: :created
    rescue => err
      render json: {error: err}, status: :bad_request
    end
  end

  def destroy
    render json: Employee.where(id: params[:id].split(',')).destroy_all
  end

  private

  def employee_params
    params.permit(:name, :email, :password)
  end
end
