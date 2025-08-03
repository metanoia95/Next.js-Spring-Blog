
# Dockerfile for Nginx
# 1. use the official Nginx image as the base image
FROM nginx 

# 2. copy the Nginx conf filet to the container
COPY default.conf /etc/nginx/conf.d/default.conf

# 3. nginx를 포그라운드로 실행
CMD ["nginx", "-g", "daemon off;"]