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

	 		logger.debug "Attempting to retrieve information for player id #{ppid}..."

			begin
				uri_career  = URI("http://www.pgatour.com/data/players/#{ppid}/career.json")
				res_career = Net::HTTP.get_response(uri_career)
				if res_career.code == "200"
					career_info = JSON.parse(res_career.body)
			 		logger.debug "Found career JSON for player id #{ppid}"
				else
					raise "error code #{res_career.code}"
				end
			rescue => c_err
				career_info['error_occurred'] = true
				career_info['error_message'] = c_err.message
				logger.debug "Error occurred retrieving career JSON data for player #{ppid}: #{c_err.message}"
			end

			begin
				uri_bio	 = URI("http://www.pgatour.com/data/players/#{ppid}/bio.json")
				res_bio = Net::HTTP.get_response(uri_bio)
				if res_bio.code == "200"
					bio_info = JSON.parse(res_bio.body)
			 		logger.debug "Found bio JSON for player id #{ppid}"
				else
					raise "error code #{res_bio.code}"
				end
			rescue => b_err
				bio_info['error_occurred'] = true
				bio_info['error_message'] = b_err.message
				logger.debug "Error occurred retrieving bio JSON data for player #{ppid}: #{b_err.message}"
			end

			player = {}
			player['career']	= career_info
			player['bio']		= bio_info
			player['name']		= "#{@player.nameF} #{@player.nameL}"
			player['player_id'] = ppid
			player['headshot']  = "http://i.pgatour.com/image/upload/t_headshots_leaderboard_l/headshots_#{ppid}.png"

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
