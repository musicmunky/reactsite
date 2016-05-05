class CreatePgaTourYears < ActiveRecord::Migration
  def change
    create_table :pga_tour_years do |t|
      t.integer :tour_year

      t.timestamps null: false
    end
  end
end
