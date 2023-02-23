FROM node:18-alpine
LABEL maintainer="Jefri Herdi Triyanto jefriherditriyanto@gmail.com"

ENV CI_CD=true
WORKDIR /app
COPY . .

RUN apk add git
RUN git config --global url."https://".insteadOf git://

# 🌊 Install Dependencies
# RUN npm i -g yarn
RUN yarn install

# ⚒️ Build
# RUN npm run build
RUN yarn swagger

# 💯 Configuration for Development
RUN sed -i 's/localhost/host.docker.internal/g' .env

# 🚀 Finish !!
EXPOSE 8080
ENV NODE_ENV=development
CMD ["yarn", "start:ts"]