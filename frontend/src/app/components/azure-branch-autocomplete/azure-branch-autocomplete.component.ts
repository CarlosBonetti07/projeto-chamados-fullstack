import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AzureDevOpsService } from '../../services/azure-devops.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-azure-branch-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './azure-branch-autocomplete.component.html'
})
export class AzureBranchAutocompleteComponent implements OnInit {
  @Input() org!: string;
  @Input() project!: string;
  @Input() repo!: string;
  @Input() pat!: string;
  @Output() branchSelected = new EventEmitter<string>();

  inputControl = new FormControl('');
  suggestions: string[] = [];
  showSuggestions = false;

  constructor(private azureService: AzureDevOpsService) {}

  ngOnInit(): void {
    this.azureService.setCredentials(this.org, this.project, this.pat, this.repo);


    this.inputControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        const filterTerm = term ? term.trim() : '';
        return this.azureService.searchBranches(filterTerm);
      })
    ).subscribe(results => {
      this.suggestions = results;
      this.showSuggestions = true;
    });

    

  }

  onOptionSelected(branch: string) {
    this.inputControl.setValue(branch);
    this.branchSelected.emit(branch);
    this.showSuggestions = false;
  }

  hideSuggestionsWithDelay() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  getBranchUrl(branch: string): string {
  // Link direto para a branch no Azure DevOps
  // URL típica: https://dev.azure.com/{org}/{project}/_git/{repo}?version=GB{branch}
  const encodedBranch = encodeURIComponent(branch);
  return `https://dev.azure.com/${this.org}/${this.project}/_git/${encodeURIComponent(this.repo)}?version=GB${encodedBranch}`;
  }


  getIcon(): string {
    return '🌿';
  }

  getColor(): string {
    return '#0078d7';
}
}
