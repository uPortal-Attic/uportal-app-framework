#!/bin/bash
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

set -e
set -u

if [[ $TRAVIS_PULL_REQUEST_SLUG != "" && $TRAVIS_PULL_REQUEST_SLUG != $TRAVIS_REPO_SLUG ]]; then
    # This is a Pull Request from a different slug, hence a forked repository
    echo this is a pull request from fork
    git remote add "$TRAVIS_PULL_REQUEST_SLUG" "https://github.com/$TRAVIS_PULL_REQUEST_SLUG.git"
    git fetch "$TRAVIS_PULL_REQUEST_SLUG"

    # Use the fetched remote pointing to the source clone for comparison
    TO="$TRAVIS_PULL_REQUEST_SLUG/$TRAVIS_PULL_REQUEST_BRANCH"
else
    echo this is an internal pull request
    # This is a Pull Request from the same remote, no clone repository
    TO=$TRAVIS_COMMIT
fi

# Lint all commits in the PR
# - Covers fork pull requests (when TO=slug/branch)
# - Covers branch pull requests (when TO=branch)
echo $TRAVIS_BRANCH
echo $TO
npx commitlint --from="$TRAVIS_BRANCH" --to="$TO"

# Always lint the triggerig commit
# - Covers direct commits
echo $TRAVIS_COMMIT
npx commitlint --from="$TRAVIS_COMMIT"
