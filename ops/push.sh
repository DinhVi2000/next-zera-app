#!/bin/bash

set -xeo pipefail
[[ -f "aws-envs.sh" ]] && source aws-envs.sh

GAME_IMAGE_NAME="portal-fe"
BRANCH_NAME=$(echo "$CI_COMMIT_BRANCH" | sed -r "s,/,-,g")
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID}"
ECR_URL="${AWS_ACCOUNT_ID}.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/zera-$AWS_ENV-repo-user-web"

build_image(){
    docker image build -f Dockerfile -t "${GAME_IMAGE_NAME}:latest" --build-arg NODE_ENV=$AWS_ENV .
}

push_image() {
    # aws ecr get-login-password --region $AWS_DEFAULT_REGION --profile zera-$AWS_ENV | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.zera.ecr.$AWS_DEFAULT_REGION.amazonaws.com
    aws ecr get-login-password --region $AWS_DEFAULT_REGION --profile zera-$AWS_ENV | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
    docker image tag "${GAME_IMAGE_NAME}:latest" "${ECR_URL}:${image_tag}"
    docker image push "${ECR_URL}:${image_tag}" &
    game_process=$! && echo $game_process
    wait $game_process
}

build_image
image_tag="$BRANCH_NAME-$(git rev-parse --short HEAD)"
push_image

cat <<EOT >> "aws-envs.sh"
export DOCKER_IMAGE="${ECR_URL}:${image_tag}"
export IMAGE_TAG="${image_tag}"
export AWS_ACCOUNT_ID="$AWS_ACCOUNT_ID"
export ECR_URL="$ECR_URL"
export AWS_REGION="$AWS_REGION"
export GAME_IMAGE_NAME="$GAME_IMAGE_NAME"
EOT
