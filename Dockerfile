FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY dashboard.html /usr/share/nginx/html/
COPY JS/ /usr/share/nginx/html/JS/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
