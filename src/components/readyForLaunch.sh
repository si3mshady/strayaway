#!/bin/bash

echo "Ready for launch"
echo "Enter React Project Name"
read projectName

npm init -y && \
npx create-react-app $projectName && \
cd $projectName && \
wget https://raw.githubusercontent.com/si3mshady/learning_js/master/tidy_react_app.py \
&& python tidy_react_app.py