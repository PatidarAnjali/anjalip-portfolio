import { FooterComponent } from '../footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { Project, ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  projects: Project[] = [];
  loading: boolean = true; // Add the loading state

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }
}