FROM node:5.7.1-slim
RUN npm install -g grunt-cli superstatic

RUN apt-get update && apt-get install -y bzip2 && apt-get install -y git

# Add frame
COPY uw-frame-components /build/uw-frame-components
COPY uw-frame-static /build/uw-frame-static
COPY package.json /build/
COPY Gruntfile.js /build/

# build frame
WORKDIR /build
RUN npm run build-static
RUN cp -r /build/uw-frame-static/target /data

WORKDIR /data

EXPOSE 8009
ENTRYPOINT ["superstatic","--port","8009","--host","0.0.0.0","--debug","true","--directory","/data"]
