class PlayersController < ApplicationController

	def index
		# page with all the data:  http://www.pgatour.com/data/players/32102/
#		@players = Player.all.first(100)
		@players = []
	end


	def getPlayerInfo
		pid = params[:player_id]

		response = {}
		content  = {}
		status   = ""
		message  = ""

		begin
			require 'net/http'
			require 'json'

			@player = Player.find(pid)

			ppid = "%05d" % pid.to_i

			career_info = {}
			bio_info = {}

			begin
				uri_career  = URI("http://www.pgatour.com/data/players/#{ppid}/career.json")
				json_career = Net::HTTP.get(uri_career)
				career_info = JSON.parse(json_career)
			rescue => c_err
				career_info['error'] = true
				career_info['error_message'] = c_err.message
			end

			begin
				uri_bio	 = URI("http://www.pgatour.com/data/players/#{ppid}/bio.json")
				json_bio = Net::HTTP.get(uri_bio)
				bio_info = JSON.parse(json_bio)
			rescue => b_err
				bio_info['error'] = true
				bio_info['error_message'] = b_err.message
			end

			player = {}
			player['career']	= career_info
			player['bio']		= bio_info
			player['name']		= "#{@player.nameF} #{@player.nameL}"
			content['player']	= player

			response['status']  = "success"
			response['message'] = "Retrieved player record successfully"
			response['content'] = content
		rescue => error
			response['status']  = "failure"
			response['message'] = "Error: #{error.message}"
			response['content'] = "Error while attempting to search the player database"
		ensure
			respond_to do |format|
				format.html { render :json => response.to_json }
			end
		end
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
				name_results = Player.where("nameF like ? or nameL like ?", "%#{narray[0]}%", "%#{narray[0]}%").order("nameL ASC").order("nameF ASC")
			elsif narray.size == 2
				name_results = Player.where("nameF like ? and nameL like ?", "%#{narray[0]}%", "%#{narray[1]}%").order("nameL ASC").order("nameF ASC")
			elsif narray.size > 2
				name_results = Player.where("nameF like ? and nameL like ?", "%#{narray[0..narray.size - 2].join(" ")}%", "%#{narray[narray.size - 1]}%").order("nameL ASC").order("nameF ASC")
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
