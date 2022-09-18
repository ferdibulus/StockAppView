# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.13.1 as build

# Set the working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/stock-app-view /usr/share/nginx/html
COPY entrypoint.sh ./docker-entrypoint.d/entrypoint.sh

# Grant Linux permissions and run entrypoint script
RUN chmod +x ./docker-entrypoint.d/entrypoint.sh

