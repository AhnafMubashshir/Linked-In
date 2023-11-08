# Use an official Node.js runtime as the base image
FROM node:18-alpine

RUN npm install -g nodemon --verbose


# Set the working directory in the container
WORKDIR /mini-linkedin/notification

# Copy your Node.js application files into the container
COPY . .

# Install application dependencies
RUN npm i --verbose

# Expose the port your application is running on
EXPOSE 6002

# Command to start your application
CMD ["npm", "run", "start"]
