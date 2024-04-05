import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Something bad happened, ${error.error.message}!`;
    } else {
      errorMessage = error.error.message ?? "Unexpected Error Occurred!";
    }
    return throwError(() => {
      return errorMessage;
    });
}

export const USEROLES = {
  0: 'ADMIN',
  1: 'CREATOR',
  2: 'PLAYER',
  4: 'NONE',
}