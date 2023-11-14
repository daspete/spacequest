#!/bin/bash

docker run --rm --name certbot \
    -v ./ssl/certbot/etc:/etc/letsencrypt \
    -v ./ssl/certbot/var:/var/lib/letsencrypt \
    -v ./ssl/certbot/www:/var/www/html \
    certbot/certbot \
    certonly \
        --webroot \
        --webroot-path=/var/www/html \
        --agree-tos \
        --email $2 \
        --no-eff-email \
        --force-renewal \
        --break-my-certs \
        --non-interactive \
        --cert-name $1 \
        -d $1
