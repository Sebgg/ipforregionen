import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from 'src/app/config.service';
import { Conveyor } from '../../conveyor.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {BluetoothComponent} from './bluetooth.component';


interface Source {
  id: string;
  name: string;
  imageUrl: string;
}

const googleFit = 'google-fit';
const dummy = 'dummy';
const bluetooth = 'bluetooth';

@Component({
  selector: 'app-platform-selection',
  templateUrl: './platform-selection.component.html',
  styleUrls: ['./platform-selection.component.scss']
})
export class PlatformSelectionComponent implements OnInit {
  sources: Source[] = [];

  constructor(
    private cfg: ConfigService,
    private conveyor: Conveyor,
    public router: Router,
    public dialog: MatDialog
  ) {
    const availableSources: Map<string, Source> = new Map<string, Source>([
      [googleFit, {
        id: googleFit,
        name: 'Google Fit',
        imageUrl:
          'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png',
          /* TODO use locally provided logo? */
      }],
      [dummy, {
        id: dummy,
        name: 'Dummy service',
        imageUrl: this.cfg.getAssetUrl() + 'wwv.png',
      }],
      [bluetooth, {
        id: bluetooth,
        name: 'Bluetooth',
        imageUrl: this.cfg.getAssetUrl() + 'btl.png',
      }],
    ]);

    const platforms = this.conveyor.getPlatforms();

    this.sources = [];
    for (const platform of platforms) {
      let source: Source;
      if (availableSources.has(platform)) {
        source = availableSources.get(platform);
      } else {
        this.sources.push({
          id: platform,
          name: platform,
          imageUrl: '',
        });
      }
      this.sources.push(source);
    }
  }

  ngOnInit() {}

  /*
  * Open bluetooth modal to handle reading of values
  */

  openBluetoothModal(): void {
    const dialogRef = this.dialog.open(BluetoothComponent, {
        width: '500px',
        height: '500px'
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/category-selection', 'bluetooth']);
      }
    })
  }

  async selectPlatform(platformId: string) {
    if (platformId == "bluetooth") {
      this.openBluetoothModal();
    } else {
      await this.conveyor.signIn(platformId);
      this.router.navigate(['/category-selection', platformId]);
    }
  }
}
