#!/bin/sh
path='./dist/apps'

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 [service-name]" 1>&2
    exit 128
fi

if [ ! -d "$path/$1" ]; then
    echo "Unknown Service '$1'" 1>&2
    exit 64
fi

exec node "$path/$1/main.js"
