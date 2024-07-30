import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchTasks(query: string, tasks: Task[]): Task[] {
    const searchWords = query.trim().toLowerCase().split(/\s+/);

    return tasks.filter((task) => {
      const targetWords = [
        task.name.toLowerCase(),
        task.description.toLowerCase(),
        task.assignedTo.toLowerCase(),
      ];
      return this.wordSearch(searchWords, targetWords);
    });
  }

  wordSearch(searchWords: string[], targetWords: string[]): boolean {
    targetWords = [...new Set(targetWords)];
    searchWords = [...new Set(searchWords)];

    for (const searchWord of searchWords) {
      const matchedWords = targetWords.filter((w) => w.startsWith(searchWord));
      if (matchedWords.length === 0) return false;

      for (const matchedWord of matchedWords) {
        targetWords = targetWords.filter((w) => w !== matchedWord);
      }
    }

    return true;
  }
}
