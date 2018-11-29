class CreateFeedbacks < ActiveRecord::Migration[5.0]
  def change
    create_table :feedbacks do |t|
      t.references :owner
      t.references :rated_user
      t.float :rating
      t.boolean :pending, default: true
      t.timestamps
    end
  end
end
