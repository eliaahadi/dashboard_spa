class CartsController < ApplicationController
  def index
    carts = Cart.select('id, company, stocks_bought, latest_stock_price, total_stocks_price, created_at').order("created_at DESC")
    render json: carts
  end

  def show
    carts = Cart.find(params[:id])
    render json: carts
  end

  def create
    cart = Cart.create(cart_param)
    render json: cart
  end

  # def create
  #   todo = Todo.create(todo_param)
  #   render json: todo
  # end

  def update
    carts = Cart.find(params[:id])
    carts.update_attributes(cart_param)
    render json: carts
  end

  def destroy
    carts = Cart.find(params[:id])
    carts.destroy
    head :no_content, status: :ok
  end

  private
    def cart_param
      params.require(:carts).permit(:company, :stocks_bought, :latest_stock_price, :total_stocks_price)
    end
end
