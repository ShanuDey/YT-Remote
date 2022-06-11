# A user Systemd service should be placed in ~/.config/systemd/user/ directory if you want to have full ownership as normal user. Create it if it doesn’t exist.
mkdir -p  ~/.config/systemd/user/

# Copy ytremote systemd service unit file under the directory.
cp ytremote.service ~/.config/systemd/user/ytremote.service

# Reload systemd
systemctl --user daemon-reload

# Start the service then
systemctl --user enable --now ytremote.service
