#!/bin/bash

ENV=$1 NODE_PATH=source WATCH=false concurrently \"webpack\" \"gulp compile\"