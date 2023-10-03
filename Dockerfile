FROM node:18-alpine



# Set the working directory for the application
WORKDIR /app

# Copy the package.json files and install dependencies for both client and server
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN cd client && npm install && cd ../server && npm install 

# Copy the rest of the application code
COPY . .

# Build the client application
WORKDIR /app/client
RUN npm run build

WORKDIR /app/server

# Expose the server port
EXPOSE 8080

# Command to start the server

CMD ["node", "/app/server/dist/index.js"]
