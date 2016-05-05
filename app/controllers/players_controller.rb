class PlayersController < ApplicationController

	def index
		# page with all the data:  http://www.pgatour.com/data/players/50092/
		@players = Player.all.first(100)
	end

end
