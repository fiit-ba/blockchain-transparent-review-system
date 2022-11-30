// Logging functions

import { MatSnackBar } from "@angular/material/snack-bar";

export function logError(error: any, snackBar: MatSnackBar, duration: number) {
  let message = error.error.error_details ? error.error.error_details : error.error.error;
  if (!message) {
    message = 'Unknown error ¯\\_(ツ)_/¯';
  }
  snackBar.open(error.status + ': ' + message, '', {
    duration,
    panelClass: 'snackbar-warning',
  });
  console.log(error);
}
