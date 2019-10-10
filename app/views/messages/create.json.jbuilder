json.(@message, :content, :image)
json.date  @message.created_at
json.user_name @message.user.name
json.id @message.id