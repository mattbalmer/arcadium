#!/bin/bash

ENV=$1 NODE_PATH=source concurrently \"webpack\" \"gulp\"