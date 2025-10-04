import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Portal } from '@angular/cdk/portal';
import { PortalModule } from '@angular/cdk/portal';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [PortalModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent {

  @ViewChild('LoaderOverlayPortal', { static: true }) loaderOverlayPortal?: Portal<any>;
  loading?: boolean;
  loaderOverlayRef?: OverlayRef;
  loaderBackdropColor?: string;

  constructor(private loaderService: LoaderService, public overlay: Overlay) {
    this.loaderService.isLoading.subscribe(async (loading) => {

      if (await loading) {
        this.openLoaderOverlay();

      } else {
        this.closeLoaderOverlay();

      }

    });

  }

  openLoaderOverlay() {
    if (this.loaderOverlayRef) { return; }

    let config = new OverlayConfig();

    config.positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.loaderOverlayRef = this.overlay.create(config);
    this.loaderOverlayRef.attach(this.loaderOverlayPortal);
  }

  closeLoaderOverlay() {
    if (!this.loaderOverlayRef) { return; }

    this.loaderOverlayRef.detach();
    this.loaderOverlayRef = undefined;
  }

}
