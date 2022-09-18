#!/bin/sh

set -e

echo "Replacing env constants in JS"

envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

#find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,API_URL,$API_URL,g' {} \;
#find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,stompConnectionEndpoint,$stompConnectionEndpoint,g' {} \;
#find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,DEBUG,$DEBUG,g' {} \;
