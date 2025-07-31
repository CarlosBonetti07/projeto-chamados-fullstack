import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AzureDevOpsService } from '../../services/azure-devops.service';
import { ChamadoBranch } from '../../models/chamadoBranches.model';
import { ChamadoBranchService } from '../../services/chamado-branch.service';

@Component({
  selector: 'app-azure-repo-branch-tree',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './azure-repo-branch-tree.component.html',
  styleUrls: ['./azure-repo-branch-tree.component.css']
})
export class AzureRepoBranchTreeComponent implements OnInit {
  private _chamadoId = 0;

  @Input()
  set chamadoId(value: number) {
    if (value && value !== this._chamadoId) {
      this._chamadoId = value;
      this.carregarBranchesChamado(value); // recarrega quando o chamado muda
    }
  }

  get chamadoId(): number {
    return this._chamadoId;
  }

  @Input() listaSelecionados: ChamadoBranch[] = [];
  @Output() listaSelecionadosChange = new EventEmitter<ChamadoBranch[]>();

  projects: { id: string; name: string }[] = [];
  reposMap: Record<string, { id: string; name: string }[]> = {};
  branchesMap: Record<string, string[]> = {};

  expandedProjects = new Set<string>();
  expandedRepos = new Set<string>();

  filterProject = '';
  filterBranch = '';
  loading = false;

  public org = 'org';
  public project = 'project';
  public repo = 'repo - Geral'; // Nome do repositório

  constructor(
    private azureService: AzureDevOpsService,
    private chamadoBranchService: ChamadoBranchService
  ) {}

  ngOnInit(): void {
    this.azureService.setCredentials(this.org, '', '');
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;
    this.projects = [];
    this.reposMap = {};
    this.branchesMap = {};
    this.expandedProjects.clear();
    this.expandedRepos.clear();

    this.azureService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;

        const reposRequests = projects.map(p =>
          this.azureService.getReposFromProject(p.name)
        );

        Promise.all(reposRequests.map(r => r.toPromise())).then(allRepos => {
          allRepos.forEach((repos, i) => {
            this.reposMap[projects[i].name] = repos || [];
          });

          const branchesRequests: Promise<void>[] = [];

          projects.forEach(project => {
            const repos = this.reposMap[project.name] || [];
            repos.forEach(repo => {
              branchesRequests.push(
                this.azureService
                  .getBranches(project.name, repo.name)
                  .toPromise()
                  .then(branches => {
                    const key = `${project.name}|${repo.name}`;
                    this.branchesMap[key] = branches || [];
                  })
              );
            });
          });

          Promise.all(branchesRequests).finally(() => {
            this.loading = false;
          });
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filteredProjects() {
    if (!this.filterProject && !this.filterBranch) return this.projects;

    return this.projects.filter(project => {
      const repos = this.reposMap[project.name] || [];

      const hasMatchingRepo = repos.some(repo => {
        const key = `${project.name}|${repo.name}`;
        const branches = this.branchesMap[key] || [];

        return branches.some(branch =>
          branch.toLowerCase().includes(this.filterBranch.toLowerCase())
        );
      });

      const matchesProject = project.name
        .toLowerCase()
        .includes(this.filterProject.toLowerCase());

      return (!this.filterBranch || hasMatchingRepo) && (!this.filterProject || matchesProject);
    });
  }

  filteredRepos(projectName: string) {
    const repos = this.reposMap[projectName] || [];

    return repos.filter(repo => {
      const matchesName = repo.name.toLowerCase().includes(this.filterProject.toLowerCase());

      if (!this.filterBranch) return matchesName;

      const key = `${projectName}|${repo.name}`;
      const branches = this.branchesMap[key] || [];

      const matchesBranch = branches.some(branch =>
        branch.toLowerCase().includes(this.filterBranch.toLowerCase())
      );

      return matchesName && matchesBranch;
    });
  }

  filteredBranches(projectName: string, repoName: string) {
    const key = `${projectName}|${repoName}`;
    const branches = this.branchesMap[key] || [];

    if (this.filterBranch) {
      return branches.filter(branch =>
        branch.toLowerCase().includes(this.filterBranch.toLowerCase())
      );
    }

    return branches;
  }

  toggleProject(projectName: string) {
    this.expandedProjects.has(projectName)
      ? this.expandedProjects.delete(projectName)
      : this.expandedProjects.add(projectName);
  }

  isProjectExpanded(projectName: string): boolean {
    return this.expandedProjects.has(projectName);
  }

  toggleRepo(projectName: string, repoName: string) {
    const key = `${projectName}|${repoName}`;
    this.expandedRepos.has(key)
      ? this.expandedRepos.delete(key)
      : this.expandedRepos.add(key);
  }

  isRepoExpanded(projectName: string, repoName: string): boolean {
    const key = `${projectName}|${repoName}`;
    return this.expandedRepos.has(key);
  }

  selectBranch(projectName: string, repoName: string, branch: string) {
    const branchUrl = `https://dev.azure.com/${this.org}/${projectName}/_git/${repoName}?version=GB${branch}`;
    const branchName = branch;

    const exists = this.listaSelecionados.some(b => b.branchName === branch && b.chamadoId === this.chamadoId);
    if (!exists) {
      const newBranch: ChamadoBranch = {
        chamadoId: this.chamadoId,
        branchName,
        objectId: 'NA',
        creatorId: 'NA',
        creatorName: 'NA',
        creatorEmail: 'NA',
        branchUrl,
      };
      this.listaSelecionados.push(newBranch);
      this.listaSelecionadosChange.emit(this.listaSelecionados);
    }
  }

  removeBranch(branch: ChamadoBranch) {
    this.listaSelecionados = this.listaSelecionados.filter(b => b !== branch);
    this.listaSelecionadosChange.emit(this.listaSelecionados);
  }

  expandAll() {
    this.projects.forEach(p => this.expandedProjects.add(p.name));
    this.projects.forEach(project => {
      const repos = this.reposMap[project.name] || [];
      repos.forEach(repo => this.expandedRepos.add(`${project.name}|${repo.name}`));
    });
  }

  collapseAll() {
    this.expandedProjects.clear();
    this.expandedRepos.clear();
  }

/*   carregarBranchesChamado() {
    this.chamadoBranchService.listar().subscribe(res => {
      this.listaSelecionados = res.filter(b => b.chamadoId === this.chamadoId);
      this.listaSelecionadosChange.emit(this.listaSelecionados);
    });
  } */

  carregarBranchesChamado(chamadoId: number) {
    this.chamadoBranchService.getBranchesPorChamado(chamadoId).subscribe(res => {
      this.listaSelecionados = res;
      this.listaSelecionadosChange.emit(this.listaSelecionados);
    });
  }
}