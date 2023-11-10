FROM node:20-alpine

# Set the working directory to /app/Client
WORKDIR /app/Client

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

EXPOSE 3030

# Run the application
CMD ["npm", "run", "preview"]
