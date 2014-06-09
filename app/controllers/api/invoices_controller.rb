class Api::InvoicesController < ApplicationController
  # before_action :set_customer, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  def index
  	@invoices = current_user.invoices
  end

  def create
    @invoice = current_user.invoices.build
    assign_invoice_items(params[:invoice])
    if @invoice.update_attributes(params.require(:invoice).permit!)
      render :text => "ok"
    end
  end

  def update
    @invoice = current_user.invoices.find(params[:id])
    assign_invoice_items(params[:invoice])
    if @invoice.update_attributes(params.require(:invoice).permit!)
      render :text => "ok"
    end
  end

  def destroy
    @invoice = current_user.invoices.find(params[:id])
    if @invoice.destroy
      render :text => "ok"
    else
      render :text => "error occured!", status: 422
    end
  end

  private
    def assign_invoice_items(invoice)
      invoice_items = invoice[:invoice_items]

      ## delete all the invoice items which are removed from the invoice
      @invoice.invoice_items.find(:all, :conditions => ["id NOT IN (?)", invoice_items.map{|ii| ii[:id] }]).each do |ii|
        ii.delete
      end

      ## update or create new and old items
      invoice_items.each do |ii|
        invoice_item = @invoice.invoice_items.find_or_create_by_id(ii[:id])
        invoice_item.update_attributes(ii.permit!)
      end

      ## remove invoice items and invoice total 
      params[:invoice].delete(:invoice_items)
      params[:invoice].delete(:total)
    end
end
