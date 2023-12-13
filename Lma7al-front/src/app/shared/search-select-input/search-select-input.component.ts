// app.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
})
export class SearchSelectComponent {
    @Input() options?: any[] = [];
    filter = '';
    show = false;
    selected: any = null;
    focusedOptionIndex: number | null = null;
  
    close(): void {
      this.show = false;
      this.filter = this.selectedName();
      this.focusedOptionIndex = this.selected ? this.focusedOptionIndex : null;
    }
  
    open(): void {
      this.show = true;
      this.filter = '';
    }
  
    toggle(): void {
      if (this.show) {
        this.close();
      } else {
        this.open();
      }
    }
  
    isOpen(): boolean {
      return this.show === true;
    }
  
    selectedName(): string {
      return this.selected ? this.selected.name : this.filter;
    }
    
    filteredOptions(): any[] {
      return this.options
        ? this.options.filter(option => {
            return (
              option.name.first.toLowerCase().includes(this.filter.toLowerCase()) ||
              option.name.last.toLowerCase().includes(this.filter.toLowerCase()) ||
              option.email.toLowerCase().includes(this.filter.toLowerCase())
            );
          })
        : [];
    }
  
    onOptionClick(index: number): void {
      this.focusedOptionIndex = index;
      this.selectOption();
    }
  
    selectOption(): void {
      if (!this.isOpen()) {
        return;
      }
      this.focusedOptionIndex = this.focusedOptionIndex ?? 0;
      const selected = this.filteredOptions()[this.focusedOptionIndex];
      if (this.selected && this.selected.login.uuid === selected.login.uuid) {
        this.filter = '';
        this.selected = null;
      } else {
        this.selected = selected;
        this.filter = this.selectedName();
      }
      this.close();
    }
  
    focusPrevOption(): void {
      if (!this.isOpen()) {
        return;
      }
      const optionsNum = this.filteredOptions().length - 1;
      if (this.focusedOptionIndex! > 0 && this.focusedOptionIndex! <= optionsNum) {
        this.focusedOptionIndex!--;
      } else if (this.focusedOptionIndex! === 0) {
        this.focusedOptionIndex = optionsNum;
      }
    }
  
    focusNextOption(): void {
      const optionsNum = this.filteredOptions().length - 1;
      if (!this.isOpen()) {
        this.open();
      }
      if (this.focusedOptionIndex === null || this.focusedOptionIndex === optionsNum) {
        this.focusedOptionIndex = 0;
      } else if (this.focusedOptionIndex! >= 0 && this.focusedOptionIndex! < optionsNum) {
        this.focusedOptionIndex!++;
      }
    }
  }
