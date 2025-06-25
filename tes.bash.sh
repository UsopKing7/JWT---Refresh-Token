#!/bin/bash

echo "Haciendo login..."
curl -i -c cookies.txt -X POST http://localhost:3333/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nicolasguarachi888@gmail.com","password":"123aBc123"}'

echo "Esperando que expire el access_token..."
sleep 6

echo "Renovando access_token con refresh_token..."
curl -i -b cookies.txt -X POST http://localhost:3333/api/refresh-token

echo "Probando ruta protegida con nuevo access_token..."
curl -i -b cookies.txt http://localhost:3333/api/protegida
