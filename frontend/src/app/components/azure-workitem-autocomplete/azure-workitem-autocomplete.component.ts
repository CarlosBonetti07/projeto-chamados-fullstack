import {Component, Input, Output, EventEmitter, OnInit, forwardRef} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule,NgStyle} from '@angular/common';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import { AzureDevOpsService } from '../../services/azure-devops.service';

@Component({
  selector: 'app-azure-workitem-autocomplete',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgStyle],
  templateUrl: './azure-workitem-autocomplete.component.html',
  styleUrl: './azure-workitem-autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AzureWorkitemAutocompleteComponent),
      multi: true
    }
  ]
})
export class AzureWorkitemAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() org!: string;
  @Input() project!: string;
  @Input() pat!: string;
  @Output() itemSelected = new EventEmitter<any>();

  inputControl = new FormControl('');
  suggestions: any[] = [];
  showSuggestions = false;

  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

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

  ngOnInit(): void {
    this.azureService.setCredentials(this.org, this.project, this.pat);

    this.inputControl.valueChanges.pipe(
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
    ).subscribe(results => {
      this.suggestions = results;
      this.showSuggestions = true;
      this.onChange(this.inputControl.value); // atualiza model
    });
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onOptionSelected(item: any) {
    const displayValue = `#${item.id} - ${item.fields['System.Title']}`;
    this.inputControl.setValue(displayValue);
    this.itemSelected.emit({
      ...item,
      url: `https://dev.azure.com/${this.org}/${this.project}/_workitems/edit/${item.id}`
    });
    this.showSuggestions = false;
    this.onChange(displayValue);
    this.onTouched();
  }

  hideSuggestionsWithDelay() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  getIcon(type: string): string {
    return this.iconMap[type] || '❓';
  }

  getColor(type: string): string {
    return this.colorMap[type] || '#999';
  }
}