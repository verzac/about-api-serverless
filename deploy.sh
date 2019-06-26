set -xe

TEMPLATE_FILENAME="template.yaml"
S3_BUCKET_NAME="about-api-serverless"
PACKAGED_TEMPLATE_FILENAME="packaged.yaml"
AWSCLI_ARGS=""
PARAMETER_OVERRIDES_ARG=""

sam package --template-file $TEMPLATE_FILENAME --s3-bucket $S3_BUCKET_NAME --output-template $PACKAGED_TEMPLATE_FILENAME  $AWSCLI_ARGS
sam deploy --template-file $PACKAGED_TEMPLATE_FILENAME --stack-name $STACK_NAME --capabilities CAPABILITY_IAM --no-fail-on-empty-changeset $AWSCLI_ARGS $PARAMETER_OVERRIDES_ARG
