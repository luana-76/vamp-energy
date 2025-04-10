#!/bin/bash

# Instala dependências do Chrome
apt-get update && apt-get install -y wget gnupg ca-certificates

# Baixa e instala o Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install

# Roda o app
npm install
npm run start
