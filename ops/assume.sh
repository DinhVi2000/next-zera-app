#!/bin/bash

set -xeuo pipefail
set -u


if [[ "${CI_COMMIT_BRANCH}" == develop ]]; then
    aws_account_id="$AWS_ACCOUNT_ID_DEV"
    aws_env="dev"
    aws_iam_role_external_id="$AWS_IAM_ROLE_EXTERNAL_ID_DEV"
fi

if [[ "${CI_COMMIT_BRANCH}" == staging ]]; then
    aws_account_id="$AWS_ACCOUNT_ID_STG"
    aws_env="stg"
    aws_iam_role_external_id="$AWS_IAM_ROLE_EXTERNAL_ID_STG"
fi

if [[ "${CI_COMMIT_BRANCH}" == main ]]; then
    aws_account_id="$AWS_ACCOUNT_ID_PROD"
    aws_env="prod"
    aws_iam_role_external_id="$AWS_IAM_ROLE_EXTERNAL_ID_PROD"
fi

# if [[ "${CI_COMMIT_TAG}" =~ v[0-9]+(\.[0-9]+){2}+_dev_* ]]; then
#     aws_account_id="$AWS_ACCOUNT_ID_DEV"
#     aws_env="dev"
#     aws_iam_role_external_id="$AWS_IAM_ROLE_EXTERNAL_ID_DEV"
# else
#   if [[ "${CI_COMMIT_TAG}" =~ v[0-9]+(\.[0-9]+){2}+_* ]]; then
#     aws_account_id="$AWS_ACCOUNT_ID_PROD"
#     aws_env="prod"
#     aws_iam_role_external_id="$AWS_IAM_ROLE_EXTERNAL_ID_PROD"
#   fi
# fi
rm -rf ~/.aws/credentials


aws_sts_credentials="$(aws sts assume-role \
    --role-arn "arn:aws:iam::${aws_account_id}:role/GitlabCI-${aws_env}" \
    --role-session-name "$GITLAB_USER_LOGIN" \
    --external-id "$aws_iam_role_external_id" \
    --duration-seconds "1800" \
    --query "Credentials" \
    --output "json")"

aws configure --profile zera-${aws_env} << EOF
$(echo "$aws_sts_credentials" | jq -r '.AccessKeyId')
$(echo "$aws_sts_credentials" | jq -r '.SecretAccessKey')
ap-southeast-1
json
EOF

echo aws_session_token="$(echo "$aws_sts_credentials" | jq -r '.SessionToken')" >> ~/.aws/credentials
echo aws_expiration="$(echo "$aws_sts_credentials" | jq -r '.Expiration')" >> ~/.aws/credentials

echo $(pwd)

cat <<EOT > "aws-envs.sh"
export AWS_ACCESS_KEY_ID="$(echo "$aws_sts_credentials" | jq -r '.AccessKeyId')"
export AWS_SECRET_ACCESS_KEY="$(echo "$aws_sts_credentials" | jq -r '.SecretAccessKey')"
export AWS_SESSION_TOKEN="$(echo "$aws_sts_credentials" | jq -r '.SessionToken')"
export AWS_ACCOUNT_ID="$aws_account_id"
export AWS_DEFAULT_REGION="ap-northeast-1"
export AWS_ENV="$aws_env"
EOT

source aws-envs.sh

ecs_cluster_name="$(aws ssm get-parameter --name /${aws_env}/ECS_CLUSTER_USER_WEB_NAME --profile zera-${aws_env} --with-decryption --query "Parameter"| jq -r '.Value' )"
service_name="$(aws ssm get-parameter --name /${aws_env}/SERVICE_USER_WEB_NAME --profile zera-${aws_env} --with-decryption --query "Parameter"| jq -r '.Value' )"

cat <<EOT >> "aws-envs.sh"
export ECS_CLUSTER_NAME="$ecs_cluster_name"
export SERVICE_USER_WEB_NAME="$service_name"
EOT

source aws-envs.sh

ls -la
