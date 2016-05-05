class CreateJoinTablePlayerPgaTourYear < ActiveRecord::Migration
	def change
		create_table :players_pga_tour_years, :id => false do |t|
			t.belongs_to :player, index: true
			t.belongs_to :pga_tour_year, index: true
		end
	end
end
