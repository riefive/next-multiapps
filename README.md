# Create App
- npx create-next-app@latest [name]
```
$ read [https://nextjs.org/docs/getting-started/installation]
ex:
$ npx create-next-app@latest app1
$ npx create-next-app@latest app2
$ npx create-next-app@latest app3
```

## Dummy Api
- https://api.escuelajs.co/api

## Setting Nginx
```
server {
        listen 5000;
        access_log off;
    
        location / {
            add_header Cache-Control "no-cache, no-store";
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-port 5000;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://localhost:5001;
            proxy_http_version 1.1;
        }

        location /feat-first {
            rewrite ^/feat-first/(.*) /$1 break;
            add_header Cache-Control "no-cache, no-store";
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-port 5000;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://localhost:5002;
            proxy_http_version 1.1;
        }

        location /feat-second {
            rewrite ^/feat-second/(.*) /$1 break;
            add_header Cache-Control "no-cache, no-store";
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-port 5000;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_pass http://localhost:5003;
            proxy_http_version 1.1;
        }
}
```

## Upload
```
$ git remote add origin https://github.com/riefive/next-multiapps.git
$ git branch -M main
$ git push -u origin main
```

## References
- Handle error fetch
$ read [https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0]
- Create rule at middleware
$ read [https://medium.com/@abdullahmufti/nextjs-middleware-route-protection-with-multiple-roles-using-serverside-authentication-cb3457ff5b41]
- Sample refresh token for next-auth
$ read [https://github.com/lawrencecchen/next-auth-refresh-tokens]
- Demo custom next-auth
$ read [https://github.com/GymnastiarAlmaGhifari/t3stack_credential_jwt_roles]
