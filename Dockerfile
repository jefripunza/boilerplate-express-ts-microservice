FROM node:18-alpine
LABEL maintainer="Jefri Herdi Triyanto jefriherditriyanto@gmail.com"

WORKDIR /app
COPY . .

# 🌊 Install Dependencies
RUN yarn

# ⚒️ Build
RUN npm run swagger
RUN npm run build

# 💯 Configuration for Development
RUN sed -i 's/NODE_ENV=local/NODE_ENV=development/g' .env
RUN sed -i 's/localhost/host.docker.internal/g' .env.development
RUN sed -i 's/DB_SYNC=true/DB_SYNC=false/g' .env.development

# 🚀 Finish !!
EXPOSE 4000
CMD ["yarn", "start"]