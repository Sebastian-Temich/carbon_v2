FROM nginx:stable-alpine

COPY build /usr/share/nginx/html
COPY infrastructure/nginx/docker.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
