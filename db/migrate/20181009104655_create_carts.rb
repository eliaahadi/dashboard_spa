class CreateCarts < ActiveRecord::Migration[5.2]
  def change
    create_table :carts do |t|
      t.string "company"
      t.integer "stocks_bought", default: 0
      t.decimal "latest_stock_price", default: "0.0"
      t.integer "total_stocks_price", default: 0
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.boolean "editing", default: false

      t.timestamps
    end
  end
end
