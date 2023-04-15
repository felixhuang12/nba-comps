# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /frontend

# ==== INSTALL DEPENDENCIES ====
COPY package.json package-lock.json ./
RUN npm install

# ==== COPY OVER REST OF STUFF ====
COPY . .

# ==== RUN ====
ENV NODE_ENV development
EXPOSE 3000
CMD [ "npm", "start"]