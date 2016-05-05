# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160504174505) do

  create_table "pga_tour_years", force: :cascade do |t|
    t.integer  "tour_year",  limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "pga_tour_years_players", id: false, force: :cascade do |t|
    t.integer "player_id",        limit: 4
    t.integer "pga_tour_year_id", limit: 4
  end

  add_index "pga_tour_years_players", ["pga_tour_year_id"], name: "index_pga_tour_years_players_on_pga_tour_year_id", using: :btree
  add_index "pga_tour_years_players", ["player_id"], name: "index_pga_tour_years_players_on_player_id", using: :btree

  create_table "players", force: :cascade do |t|
    t.string   "nameL",      limit: 255
    t.string   "nameF",      limit: 255
    t.string   "nameMI",     limit: 255
    t.string   "nameShort",  limit: 255
    t.string   "ct",         limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "records", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.date     "date"
    t.float    "amount",     limit: 24
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

end
