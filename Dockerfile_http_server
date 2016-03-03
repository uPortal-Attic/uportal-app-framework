FROM node:5.7.1-slim
RUN npm install -g http-server grunt-cli

RUN apt-get update
RUN apt-get install bzip2

# Add frame
ADD uw-frame-components /build/uw-frame-components
ADD uw-frame-static /build/uw-frame-static
ADD package.json /build
ADD Gruntfile.js /build

# build frame
WORKDIR /build
RUN npm run build-static
RUN cp -r /build/uw-frame-static/target /data

# entry point
ENTRYPOINT ["http-server","/data", "-p","8009"]
