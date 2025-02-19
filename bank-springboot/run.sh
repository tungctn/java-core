#!/bin/bash

function build() {
    echo "Building project..."
    mvn clean install
}

function start() {
    echo "Starting application..."
    mvn spring-boot:run
}

function stop() {
    echo "Stopping application..."
    kill $(lsof -t -i:8080)
}

case "$1" in
    "build")
        build
        ;;
    "start")
        start
        ;;
    "stop")
        stop
        ;;
esac