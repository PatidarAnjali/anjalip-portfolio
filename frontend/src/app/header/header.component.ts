import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';  // Importing the slide-toggle module
// import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatSlideToggleModule], // Add the MatSlideToggleModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'anjali-portfolio';
  isHandset: boolean = false;
  isDarkMode: boolean = false;  // Track dark mode state

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
        if (!this.isHandset) {
          this.closeSidenav();
        }
      });
  
    // Check the saved theme preference in localStorage
    if (localStorage.getItem("dark-mode") === "enabled") {
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    }
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 600) {
      this.closeSidenav();
    }
  }

  closeSidenav() {
    if (this.sidenav && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  toggleDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
    }
  }  
}
