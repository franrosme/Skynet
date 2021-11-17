#!/bin/bash
heroku login
git init
heroku git:remote -a frontend4rt
git add .
git commit -am "make it better"
git checkout -b main
git push heroku main
