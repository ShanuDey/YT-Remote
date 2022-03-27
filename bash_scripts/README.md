# Startup systemd service installation

- set permission for startup script

`sudo chmod +x start.sh`

- Copy ytremote service file to the systemd location

`sudo cp ytremote.service /lib/systemd/system/ytremote.service`

- set permission

`sudo chmod 644 /lib/systemd/system/ytremote.service`

- reload systemd deamon

`sudo systemctl daemon-reload`

- enable service file for start up

`sudo systemctl enable ytremote.service`

- Reboot

`sudo reboot`
