import { exec } from 'child_process';

export default class SystemCommands {
  callback(error, stdout, stderr) {
    console.error(error);
    console.log(stdout, stderr);
  }

  // Create shutdown function
  executeShutdownCommand() {
    exec('sudo shutdown -h now', this.callback);
  }

  // Create reboot function
  executeRebootCommand() {
    exec('sudo reboot', this.callback);
  }
}
