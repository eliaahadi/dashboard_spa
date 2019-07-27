class CartsController < ApplicationController
  before_action :set_cart, only: [:show, :update, :destroy]

  # GET /carts
  def index
    @carts = Cart.all

    render json: @carts
  end

  # GET /carts/1
  def show
    render json: @cart
  end

  # POST /carts
  def create
    @cart = Cart.new(cart_params)

    if @cart.save
      render json: @cart, status: :created
    else
      render json: @cart.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /carts/1
  def update
    if @cart.update(cart_params)
      render json: @cart
    else
      render json: @cart.errors, status: :unprocessable_entity
    end
  end

  # DELETE /carts/1
  def destroy
    if @cart.destroy
      head :no_content, status: :ok
    else
      render json: @cart.errors, status: :unprocessable_entity
    end    
  end

  private
    def set_cart
      @cart = Cart.find(params[:id])
    end

    def cart_params
      params.require(:cart).permit(:company, :stocks_bought, :latest_stock_price, :total_stocks_price, :editing)
    end
end

# sample CREATE in Postman
# url -> http://localhost:3000/api/carts/
# set headers as key with "content-type" and value as "application/json"
# {
# 	"cart": {
#     "company": "AAPL",
#     "stocks_bought": "2",
#     "latest_stock_price": "202.435",
#     "total_stocks_price": "404"
#   }
# }

# sample READ in Postman
# url -> http://localhost:3000/api/carts/

# sample UPDATE in Postman
# url + id -> http://localhost:3000/api/carts/3
# set headers as key with "content-type" and value as "application/json"
# {
# 	"cart": {
#     "company": "AAPL",
#     "stocks_bought": "2",
#     "latest_stock_price": "202.435",
#     "total_stocks_price": "404"
#   }
# }

# sample DELETE in Postman
# url + id -> http://localhost:3000/api/carts/3
