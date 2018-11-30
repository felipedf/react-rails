FROM node:8.12
RUN mkdir /client-eval
WORKDIR /client-eval
RUN npm install -g serve
COPY . /client-eval
RUN npm install
RUN npm install react-scripts@2.1.1 -g
