#!/bin/sh

rm -rf dist/ && mkdir -p dist/ &&
babel server.js -o dist/server.js &&
cp ../dist/graphiql.js dist/graphiql.js &&
cp ../graphiql.css dist/graphiql.css &&
cp -r vendor/ dist/vendor/ &&
cp queryList.json dist/queryList.json &&
cat index.html > dist/index.html
