import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
  // image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private jsonUrl = 'assets/projects.json'; // Path to the JSON file in assets

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.jsonUrl);
  }
}
