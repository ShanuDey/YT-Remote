// Require child_process
import { exec } from 'child_process';

export default class SystemCommands {
  // Create shutdown function
  executeShutdownCommand(callback) {
    exec('shutdown -h now', function (error, stdout, stderr) {
      callback(stdout);
    });
  }

  // Create reboot function
  executeRebootCommand(callback) {
    exec('reboot', function (error, stdout, stderr) {
      callback(stdout);
    });
  }

  executePwdCommand(callback) {
    exec('pwd', function (error, stdout, stderr) {
      callback(stdout);
    });
  }

  // // shutdown computer
  // executeShutdownCommand(function (output) {
  //   console.log(output);
  // });
}
