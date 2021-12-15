# Use a lighter version of Node as a parent image
FROM node:14-alpine
# Set the working directory to /backend
WORKDIR /backend
# copy package.json into the container at /backend
COPY package*.json /backend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /backend
COPY . /backend/
# Make port 4000 available to the world outside this container
EXPOSE 4000
# Run the app when the container launches
CMD ["npm", "start"]