# class CartsController < ApplicationController
#   def index
#     carts = Cart.select('id, company, stocks_bought, latest_stock_price, total_stocks_price, created_at').order("created_at DESC")
#     render json: carts
#   end

#   def show
#     carts = Cart.find(params[:id])
#     render json: carts
#   end

#   def create
#     cart = Cart.create(cart_param)
#     render json: cart
#   end

#   # def create
#   #   todo = Todo.create(todo_param)
#   #   render json: todo
#   # end

#   def update
#     carts = Cart.find(params[:id])
#     carts.update_attributes(cart_param)
#     render json: carts
#   end

#   def destroy
#     carts = Cart.find(params[:id])
#     carts.destroy
#     head :no_content, status: :ok
#   end

#   private
#     def cart_param
#       params.require(:carts).permit(:company, :stocks_bought, :latest_stock_price, :total_stocks_price)
#     end
# end



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

  # def create
  #   @list = List.new(list_params)

  #   if @list.save
  #     render json: @list, status: :created
  #   else
  #     render json: @list.errors, status: :unprocessable_entity
  #   end
  # end

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
    # # Use callbacks to share common setup or constraints between actions.
    def set_cart
      @cart = Cart.find(params[:id])
    end

    # # Only allow a trusted parameter "white list" through.
    def cart_params
      params.require(:cart).permit(:company, :stocks_bought, :latest_stock_price, :total_stocks_price, :editing)
    end

    # def list_params
    #   params.require(:list).permit(:title, :excerpt, :description, :upvotes)
    # end
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
