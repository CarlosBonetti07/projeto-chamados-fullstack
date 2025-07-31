import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AzureDevOpsService {
  private org!: string;
  private project!: string;
  private pat!: string;
  private repo?: string;
  
  constructor(private http: HttpClient) {}

  public getHTTPClient(): HttpClient {
    return this.http;
  }

  setCredentials(org: string, project: string, pat: string, repo?: string) {
    this.org = org;
    this.project = project;
    this.pat = pat;
    if (repo) this.repo = repo;
  }
  

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(`:${this.pat}`),
      'Content-Type': 'application/json',
    });
  }

  searchWorkItems(ids: string): Observable<any[]> {
    const url = `https://dev.azure.com/${this.org}/${this.project}/_apis/wit/workitems?ids=${ids}&fields=System.Title,System.WorkItemType&api-version=7.0`;

    return this.http.get<{ value: any[] }>(url, { headers: this.getHeaders() }).pipe(
      catchError(err => {
        if (err.status === 404) return of({ value: [] });
        throw err;
      }),
      switchMap(response => of(response.value || []))
    );
  }

  searchWorkItemsByTitle(searchText: string): Observable<any[]> {
    const url = `https://dev.azure.com/${this.org}/${this.project}/_apis/wit/wiql?api-version=7.0`;

    const body = {
      query: `SELECT [System.Id] FROM WorkItems WHERE [System.Title] CONTAINS '${searchText}' ORDER BY [System.Id]`
    };

    return this.http.post<any>(url, body, { headers: this.getHeaders() }).pipe(
      switchMap(response => {
        if (!response.workItems || response.workItems.length === 0) return of([]);
        const ids = response.workItems.map((wi: any) => wi.id).join(',');
        return this.searchWorkItems(ids);
      }),
      catchError(() => of([]))
    );
  }

  
searchBranches(searchText: string): Observable<string[]> {
  const encodedProject = encodeURIComponent(this.project);
  const encodedRepo = encodeURIComponent(this.repo || '');

  const url = `https://dev.azure.com/${this.org}/${encodedProject}/_apis/git/repositories/${encodedRepo}/refs?api-version=7.0`;

  return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
    switchMap(response => {
      const refs = response.value || [];
      const branches = refs
        .map((ref: any) => ref.name.replace('refs/heads/', ''))
        .filter((branch: string) => branch.toLowerCase().includes(searchText.toLowerCase()));
      return of(branches);
    }),
    catchError(() => of([]))
  );
}


getProjects(): Observable<{ id: string; name: string }[]> {
  const url = `https://dev.azure.com/${this.org}/_apis/projects?api-version=7.1-preview.4`;

  return this.http.get<{ value: any[] }>(url, { headers: this.getHeaders() }).pipe(
    switchMap(res => {
      const projects = res.value.map(p => ({
        id: p.id,
        name: p.name
      }));
      return of(projects);
    }),
    catchError(() => of([]))
  );
}

getReposFromProject(project: string): Observable<{ id: string; name: string }[]> {
  const encodedProject = encodeURIComponent(project);
  const url = `https://dev.azure.com/${this.org}/${encodedProject}/_apis/git/repositories?api-version=7.1-preview.1`;

  return this.http.get<{ value: any[] }>(url, { headers: this.getHeaders() }).pipe(
    switchMap(res => {
      const repos = res.value.map(r => ({
        id: r.id,
        name: r.name
      }));
      return of(repos);
    }),
    catchError(() => of([]))
  );
}

getBranches(project: string, repo: string): Observable<string[]> {
  const encodedProject = encodeURIComponent(project);
  const encodedRepo = encodeURIComponent(repo);
  const url = `https://dev.azure.com/${this.org}/${encodedProject}/_apis/git/repositories/${encodedRepo}/refs?api-version=7.0`;

  return this.http.get<{ value: any[] }>(url, { headers: this.getHeaders() }).pipe(
    switchMap(res => {
      const branches = res.value
        .map(ref => ref.name.replace('refs/heads/', ''))
        .filter(name => name); // remove branches vazias
      return of(branches);
    }),
    catchError(() => of([]))
  );
}





}