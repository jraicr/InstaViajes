FROM webdevops/php-nginx:8.2-alpine
LABEL maintainer="J. Rai <jraicr@github>"

# Labels
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="php-xdebug-composer"
LABEL org.label-schema.description="Image from php:fpm-alpine with Xdebug, Composer and PHP Extensions requeriments for default Laravel project."

ARG CACHEBUST=1

RUN apk --no-cache update && apk --no-cache upgrade

RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        linux-headers \
        tar 

RUN apk --no-cache add \
    gmp-dev \
    oniguruma-dev \
    icu-dev \
    zip \
    unzip \
    git \
    curl
    
RUN rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*

# PHP Ext   
RUN docker-php-ext-install pdo_mysql \
        bcmath exif pcntl intl gmp opcache && \
        pecl install xdebug-3.2.0 swoole && \
    docker-php-ext-enable xdebug swoole && \
    apk del --no-cache .build-deps

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# # Create system user to run Composer and Artisan Commands
# RUN adduser -D -G www-data -u $uid -h /home/apiUser apiUser
# RUN addgroup apiUser root
# RUN addgroup apiUser
# RUN addgroup apiUser apiUser
# RUN mkdir -p /home/apiUser/.composer && \
#     chown -R apiUser:apiUser /home/apiUser

ENV WEB_DOCUMENT_ROOT /app/public
ENV APP_ENV production
WORKDIR /app

COPY InstaViajes_backend/ .

RUN composer install --no-interaction --optimize-autoloader --no-dev

# Crea enlace simbolico a storage
RUN php artisan storage:link

# Ejecuta migraciones y seeders
RUN php artisan migrate:fresh --seed --force

# Optimizar configuración 
RUN php artisan config:cache

# Optimizar rutas
RUN php artisan route:cache

# Optimiza vistas 
RUN php artisan view:cache

RUN chown -R application:application .