import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  adjustSnackBarStyle() {

    const observer = new MutationObserver(() => {
      const panes = document.querySelectorAll('.cdk-overlay-pane');

      panes.forEach(pane => {
        const isSnackbar = !!pane.querySelector('.mat-mdc-snack-bar-container');
        const alreadyAnimated = pane.classList.contains('snackbar-animated');

        if (isSnackbar && !alreadyAnimated) {
          pane.classList.add('snackbar-animated');

          setTimeout(() => {
            pane.classList.remove('snackbar-animated');
            pane.classList.add('snackbar-closing');
          }, 2700);

          setTimeout(() => {
            const dismissBtn = pane.querySelector('button.mat-mdc-snack-bar-action') as HTMLElement;
            if (dismissBtn) dismissBtn.click();
          }, 3000);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

}
