#!/bin/bash

# Tên ứng dụng trên PM2
APP_NAME="khanhnn-insights"

# Build ứng dụng cho production
echo "--- Building application for production... ---"
npm run build

# Kiểm tra xem ứng dụng đã chạy với PM2 chưa
pm2 describe $APP_NAME > /dev/null
RUNNING=$?

if [ $RUNNING -eq 0 ]; then
  echo "--- Stopping existing PM2 process: $APP_NAME... ---"
  pm2 stop $APP_NAME
fi

# Khởi động ứng dụng với PM2
echo "--- Starting application with PM2 on port 3001... ---"
pm2 start npm --name $APP_NAME -- run prod:start

echo "--- Application started successfully with PM2. ---"
echo "--- To see logs, run: pm2 logs $APP_NAME ---"
echo "--- To see status, run: pm2 list ---"
