import { FooterComponent } from '../footer/footer.component';
import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Project, ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected here as well
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  loading: boolean = true; // Add the loading state
  showBackToTop: boolean = false; // Track visibility of the button

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  // Method to scroll to the top
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Smooth scroll
    });
  }

  // Host listener to monitor the scroll position
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Get the position of the "About Section"
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      this.showBackToTop = rect.top <= 0; // Show the button when the section is scrolled into view
    }
  }
}