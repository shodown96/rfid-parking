# RFID Parking Project 
## For CSC 318
This project was made with react and ioinc-capacitor.
<br>
Set all your environment variables required for the django production settings in `/root/.env` or whatever hosting service you're using, check `parking/prod_settings` and `/root/manage.py`.
<br>
Run the following commands to get the project running
```
cd frontend/
npm install && npm start
npm run build

sudo npm install -g @ionic/cli
npm install @capacitor/core
ionic capacitor add android
npx cap open android
ionic capacitor copy
npx cap copy
npx cap serve
npx cap update

flutter emulators
flutter emulators --launch Pixel_2_API_30
```
## For Heroku hosting

```
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
```

  <!-- https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables=%7B%22id%22%3A%22851269054%22%2C%22include_reel%22%3Atrue%2C%22fetch_mutual%22%3Afalse%2C%22first%22%3A1000%2C%22after%22%3A%22QVFBTWZYdFJ3dnFSUi04MHFjWi11ZmtSNGdxX3luV1dING5ZYkEyQTJnSmJRV2VlMzViQzZSdEhkVmIzcjFiUk1ZUERmT2lDWU5KcUVzUU5SenIwU0JfeA%3D%3D%22%7D
  https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables=%7B%22id%22%3A%22851269054%22%2C%22include_reel%22%3Atrue%2C%22fetch_mutual%22%3Afalse%2C%22first%22%3A1000%2C%22after%22%3A%22QVFES29rN28tQTc4ZTJ1Wmx1aEtxOXBTTFhIb21MaFZlcDItOV9TMWRadjk4RUt0bWZmcTFTZEJiTHpCUkh1X1lfVHE1blN2VVhpd2tPUFViS3l1VHhvZQ%3D%3D%22%7D -->