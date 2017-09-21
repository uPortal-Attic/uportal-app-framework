#
# Licensed to Apereo under one or more contributor license
# agreements. See the NOTICE file distributed with this work
# for additional information regarding copyright ownership.
# Apereo licenses this file to you under the Apache License,
# Version 2.0 (the "License"); you may not use this file
# except in compliance with the License.  You may obtain a
# copy of the License at the following location:
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

FROM node:5.7.1-slim
MAINTAINER uPortal Developers <uportal-dev@apereo.org>
RUN npm install -g superstatic

RUN apt-get update && apt-get install -y bzip2 && apt-get install -y git

# Add frame
COPY tools /build/tools
COPY components /build/components
COPY static /build/static
COPY package.json /build/

# build frame
WORKDIR /build
RUN npm install
RUN npm run build-static
RUN cp -r /build/static/target /data

WORKDIR /data

EXPOSE 8009
ENTRYPOINT ["superstatic","--port","8009","--host","0.0.0.0","--debug","true","--directory","/data"]
