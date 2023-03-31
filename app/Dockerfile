ARG NODE_VERSION=19-alpine3.16

FROM node:${NODE_VERSION}

# Set the working directory to /app
WORKDIR /usr/src/app


# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 5000 for the app to run on
EXPOSE 5000

# Set the command to run the app
CMD [ "npm", "start" ]