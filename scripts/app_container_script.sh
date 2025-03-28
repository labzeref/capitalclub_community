#!/bin/sh

# Add permissions to the directories
echo "-----------Add permissions to the directories-----------"
chown -R www-data:www-data storage bootstrap/cache

# Installing Composer
echo "-----------Installing Composer-----------"
if [ -d "vendor" ]; then
    echo "Vendor directory exists. Skipping Composer installation."
else
    composer install
fi

# Cache Stuff
echo "-----------Cache Stuff-----------"
php artisan route:cache
php artisan config:cache
php artisan view:cache
php artisan event:cache

# Running services
echo "-----------Running services-----------"
php artisan ser --host 0.0.0.0 --port 8002
