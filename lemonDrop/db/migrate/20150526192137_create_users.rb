class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :first
      t.text :last
      t.text :email
      t.string :picture
      t.string :github
      t.string :linkedin
      t.string :facebook
      t.text :quote
      t.text :bio
      t.text :skill_primary
      t.text :skill_secondary
      t.string :personal_link

      t.timestamps null: false
    end
  end
end
