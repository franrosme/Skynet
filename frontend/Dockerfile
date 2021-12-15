# Use a lighter version of Node as a parent image
FROM node:14-alpine
# Set the working directory to /client
WORKDIR /frontend
#add the ENV to Dockerfile
ENV PATH /frontend/node_modules/.bin:$PATH
# copy package.json into the container at /frontend
COPY package*.json /frontend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /frontend
COPY . /frontend/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]