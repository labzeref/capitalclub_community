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

# Running services
echo "-----------Running services-----------"
php artisan ser --host 0.0.0.0 --port 8002
