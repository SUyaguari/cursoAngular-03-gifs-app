import { Component } from '@angular/core';
import { GifsSideMenuHeader } from './side-menu-header/gifs-side-menu-header';
import { GifsSideMenuOptions } from './side-menu-options/gifs-side-menu-options';

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeader, GifsSideMenuOptions],
  templateUrl: './gifs-side-menu.html',
})
export class GifsSideMenu { }
