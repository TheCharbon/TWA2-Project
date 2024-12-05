#!/bin/bash
set -e

#./prepareDeploy.sh

aws s3 cp ../server/full.zip s3://snappy-chat-zip/full.zip

VERSION_LABEL="v$(date +%Y%m%d%H%M%S)"
echo "new version label $VERSION_LABEL"

aws elasticbeanstalk create-application-version --application-name chat-application --version-label $VERSION_LABEL --source-bundle S3Bucket=snappy-chat-zip,S3Key=full.zip --no-cli-pager

aws elasticbeanstalk update-environment --environment-name Chat-application-env --version-label $VERSION_LABEL --no-cli-pager


echo "Deploy completed"