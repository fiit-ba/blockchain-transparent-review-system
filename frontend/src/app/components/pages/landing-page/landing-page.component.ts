import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  height: number | undefined;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.resizeSection();
  }

  @HostListener('window:resize') onResize() {
    this.resizeSection();
  }

  resizeSection() {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    this.height = vh - 64;
  }
}
