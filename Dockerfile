FROM node:5.7.1-slim
RUN npm install -g grunt-cli superstatic

RUN apt-get update && apt-get install bzip2

# Add frame
ADD uw-frame-components /build/uw-frame-components
ADD uw-frame-static /build/uw-frame-static
ADD package.json /build
ADD Gruntfile.js /build

# build frame
WORKDIR /build
RUN npm run build-static
RUN cp -r /build/uw-frame-static/target /data

WORKDIR /data

EXPOSE 8009
ENTRYPOINT ["superstatic","--port","8009","--host","0.0.0.0","--debug","true","--directory","/data"]
