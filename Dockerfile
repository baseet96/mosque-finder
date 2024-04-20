# Use official Node.js image as the base image
FROM node:16-alpine AS build

# Set working directory inside the image
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the image
COPY . .

EXPOSE 3000

CMD ["npm", "start"]