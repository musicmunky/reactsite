class PlayersController < ApplicationController

	def index
		# page with all the data:  http://www.pgatour.com/data/players/32102/
		@players = Player.all.first(100)
	end


	def searchPlayerNames

		nme = params[:player_name]

		response = {}
		content  = {}
		status   = ""
		message  = ""

		begin
			name_results = {}
			narray = nme.split(" ")
			if narray.size == 0
				raise "No name data received by the server for processing"
			elsif narray.size == 1
				name_results = Player.where("nameF like ? or nameL like ?", "%#{narray[0]}%", "%#{narray[0]}%")
			elsif narray.size == 2
				name_results = Player.where("nameF like ? and nameL like ?", "%#{narray[0]}%", "%#{narray[1]}%")
			elsif narray.size > 2
				name_results = Player.where("nameF like ? and nameL like ?", "%#{narray[0..narray.size - 2].join(" ")}%", "%#{narray[narray.size - 1]}%")
			else
				raise "Unspecified error while handling name data - please refresh the page and try again"
			end

			content['players'] = name_results

			response['status'] = "success"
			response['message'] = "Retrieved #{name_results.size} records"
			response['content'] = content
		rescue => error
			response['status'] = "failure"
			response['message'] = "Error: #{error.message}"
			response['content'] = "Error while attempting to search the player database"
		ensure
			respond_to do |format|
				format.html { render :json => response.to_json }
			end
		end

	end

end
