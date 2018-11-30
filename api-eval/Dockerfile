FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /api-eval
WORKDIR /api-eval
COPY . /api-eval
RUN bundle install