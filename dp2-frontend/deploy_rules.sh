#!/bin/bash
sudo rm -r /var/www/html/
sudo mv ~/dist/ /var/www/html/
sudo service apache2 restart