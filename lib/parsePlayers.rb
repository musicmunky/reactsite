#!/home/tandrews/.rvm/rubies/ruby-2.2.1/bin/ruby

require 'mysql2'
require 'sequel'
require 'json'


MYSQL = Sequel.connect(:adapter => 'mysql2', :host => "localhost", :database => "reactsite_development", :username => "", :password => "", :test => true)

plrs		= File.read('player.json')
plrs_json	= JSON.parse(plrs)
players		= plrs_json['plrs']

=begin
class Player < ActiveRecord::Base {
            :id => :integer,
         :nameL => :string,
         :nameF => :string,
        :nameMI => :string,
     :nameShort => :string,
            :ct => :string,
    :created_at => :datetime,
    :updated_at => :datetime
}
=end
=begin
{
	"nameShort" : "",
	"pr" : "",
	"r" : "n","s" : "n","h" : "n","m" : "n","c" : "n",
	"nameL" : "",
	"nameF" : "",
	"nameMI" : "",
	"ct" : "",
	"pid": "10219",
	"yrs": ["1992"]
}
=end
=begin
players.each do |player|

	pyears = player['yrs'].map(&:to_i)
	pid = player['pid'].to_i
	puts "PROCESS PLAYER: #{player['nameF']} #{player['nameL']}"

	MYSQL[:players].insert(
		'id' => pid,
		'nameL' => player['nameL'],
		'nameF' => player['nameF'],
		'nameMI' => player['nameMI'],
		'nameShort' => player['nameShort'],
		'ct' => player['ct'],
		"created_at" => Time.now.strftime("%Y-%m-%d %H:%M:%S"),
		"updated_at" => Time.now.strftime("%Y-%m-%d %H:%M:%S")
	)

	@yr_array = MYSQL["SELECT id FROM pga_tour_years WHERE tour_year in (#{pyears.join(',')})"]

	@yr_array.each do |yr|

		MYSQL[:players_pga_tour_years].insert(
			'player_id' => pid,
			'pga_tour_year_id' => yr[:id],
		)

	end
end
=end

