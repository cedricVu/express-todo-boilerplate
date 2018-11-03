#!/bin/bash
docker build -t sonvu/todo-service .
docker push sonvu/todo-service

ssh deploy@$DEPLOY_SERVER << EOF
docker pull sonvu/todo-service
docker stop todo-service || true
docker rm todo-service || true
docker rmi sonvu/todo-service:current || true
docker tag sonvu/todo-service:latest sonvu/todo-service:current
docker run -d --restart always --name todo-service -p 5555:5555 sonvu/todo-service:current
EOF
