#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd .vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
git add -A
git commit -m "Deploy $GITHUB_SHA"

# if you are deploying to https://<USERNAME>.github.io
git push -f https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/naxmefy/naxmefy.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
