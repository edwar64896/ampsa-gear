#!/bin/bash
rm -f storage/*
npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
