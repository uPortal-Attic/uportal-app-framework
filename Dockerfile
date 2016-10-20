FROM node:5.7.1-slim
MAINTAINER Tim Levett <tim.levett@wisc.edu>
RUN npm install -g superstatic

RUN apt-get update && apt-get install -y bzip2 && apt-get install -y git

# Add frame
COPY tools /build/tools
COPY uw-frame-components /build/uw-frame-components
COPY uw-frame-static /build/uw-frame-static
COPY package.json /build/

# build frame
WORKDIR /build
RUN npm install
RUN npm run build-static
RUN cp -r /build/target/uw-frame-static /data

WORKDIR /data

EXPOSE 8009
ENTRYPOINT ["superstatic","--port","8009","--host","0.0.0.0","--debug","true","--directory","/data"]
