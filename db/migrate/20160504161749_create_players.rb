class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :nameL
      t.string :nameF
      t.string :nameMI
      t.string :nameShort
      t.string :ct

      t.timestamps null: false
    end
  end
end
