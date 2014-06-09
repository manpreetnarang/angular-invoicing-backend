class Api::CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  def index
  	@customers = current_user.customers
  	render json: @customers.to_json
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_customer
      @customer = Customer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def customer_params
      params.require(:customer).permit(:name, :company_name, :address1, :address2, :postal_code)
    end

end
