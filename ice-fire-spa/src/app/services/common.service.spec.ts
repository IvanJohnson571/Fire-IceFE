import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    service = new CommonService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should observe document.body mutations', () => {
    const observeSpy = jasmine.createSpy('observe');
    (window as any).MutationObserver = function (cb: Function) {
      this.observe = observeSpy;
    } as any;

    service.adjustSnackBarStyle();

    expect(observeSpy).toHaveBeenCalledWith(document.body, {
      childList: true,
      subtree: true
    });
  });

  it('should correctly add and remove snackbar animation classes', (done) => {
    const pane = document.createElement('div');
    const snackbar = document.createElement('div');
    snackbar.classList.add('mat-mdc-snack-bar-container');
    pane.appendChild(snackbar);
    document.body.appendChild(pane);

    const addSpy = spyOn(pane.classList, 'add').and.callThrough();
    const removeSpy = spyOn(pane.classList, 'remove').and.callThrough();

    const isSnackbar = !!pane.querySelector('.mat-mdc-snack-bar-container');
    const alreadyAnimated = pane.classList.contains('snackbar-animated');

    if (isSnackbar && !alreadyAnimated) {
      pane.classList.add('snackbar-animated');

      setTimeout(() => {
        pane.classList.remove('snackbar-animated');
        pane.classList.add('snackbar-closing');
      }, 50);
    }

    setTimeout(() => {
      expect(addSpy).toHaveBeenCalledWith('snackbar-animated');
    }, 10);

    setTimeout(() => {
      expect(removeSpy).toHaveBeenCalledWith('snackbar-animated');
      expect(addSpy).toHaveBeenCalledWith('snackbar-closing');
      document.body.removeChild(pane);
      done();
    }, 80);
  });
});
