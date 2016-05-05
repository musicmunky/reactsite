class RenamePlayersPgaTourYears < ActiveRecord::Migration
	def self.up
		rename_table :players_pga_tour_years, :pga_tour_years_players
	end

	def self.down
		rename_table :pga_tour_years_players, :players_pga_tour_years
	end
end
