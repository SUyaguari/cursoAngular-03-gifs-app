import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Home',
      route: '/dashboard/home',
      subLabel: 'Home'
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'GIFs Populares'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      subLabel: 'Buscar GIFs'
    }
  ]

 }
