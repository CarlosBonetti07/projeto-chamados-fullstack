import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { AzureDevOpsService } from '../../services/azure-devops.service';

// Remover estes três do materials:
// Angular Material modules usados
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common'; // para diretiva [ngStyle]
//


@Component({
  selector: 'app-azure-workitem-autocomplete-angular-material',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, CommonModule, ReactiveFormsModule, NgStyle],
  templateUrl: './azure-workitem-autocomplete-angular-material.component.html',
  styleUrl: './azure-workitem-autocomplete-angular-material.component.css'
})
export class AzureWorkitemAutocompleteComponentAngularMaterial implements OnInit {
  @Input() org!: string;
  @Input() project!: string;
  @Input() pat!: string;
  @Output() itemSelecionado = new EventEmitter<any>();

  inputControl = new FormControl('');
  suggestions$: Observable<any[]> = of([]);

  iconMap: Record<string, string> = {
    'Bug': '🐞',
    'Task': '📝',
    'User Story': '📖',
    'Feature': '⭐',
    'Product Backlog Item': '🧩',
    'Epic': '🚀'
  };

  colorMap: Record<string, string> = {
    'Bug': '#e74c3c',
    'Task': '#2ecc71',
    'User Story': '#3498db',
    'Feature': '#9b59b6',
    'Product Backlog Item': '#f39c12',
    'Epic': '#8e44ad'
  };

  constructor(private azureService: AzureDevOpsService) {}

  ngOnInit() {
    this.azureService.setCredentials(this.org, this.project, this.pat);

    this.suggestions$ = this.inputControl.valueChanges.pipe(
      filter((value): value is string => value !== null),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.startsWith('#')) {
          const idStr = term.replace('#', '').trim();
          const idNum = Number(idStr);
          if (idNum > 0 && Number.isInteger(idNum)) {
            return this.azureService.searchWorkItemsByTitle(idStr);
          }
        }
        return of([]);
      })
    );
  }

  displayFn(item: any): string {
    return item ? `#${item.id} - ${item.fields['System.Title']}` : '';
  }

  getIcon(type: string): string {
    return this.iconMap[type] || '❓';
  }

  getColor(type: string): string {
    return this.colorMap[type] || '#999';
  }

  onOptionSelected(item: any) {
    this.itemSelecionado.emit(item);
  }
}
