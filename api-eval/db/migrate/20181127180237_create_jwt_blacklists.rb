class CreateJwtBlacklists < ActiveRecord::Migration[5.0]
  def change
    create_table :jwt_blacklists do |t|

      t.timestamps
    end
  end
end
