class PagesController < ApplicationController
  def index
    @posts = Post.limit(5)
    redirect_to "https://tosbourn.com"
  end
end
