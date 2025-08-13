
# Dockerfile for Nginx
# 1. use the official Nginx image as the base image
FROM nginx:alpine 

RUN apk add --no-cache bash gettext

# 기본 conf 제거 (혼선 방지)
RUN rm -f /etc/nginx/conf.d/default.conf

# 템플릿만 두면 공식 entrypoint가 자동 치환해줌
COPY nginx.conf.tmpl /etc/nginx/templates/default.conf.template


# 3. nginx를 포그라운드로 실행
CMD ["nginx", "-g", "daemon off;"]