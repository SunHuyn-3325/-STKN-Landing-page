import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs implements AfterViewInit {

ngAfterViewInit() {

  const elements = document.querySelectorAll(
    '.animate-left, .animate-right, .animate-up'
  );

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){
        entry.target.classList.add('show');
      } 
      else{
        entry.target.classList.remove('show');
      }

    });

  },{
    threshold: 0.25
  });

  elements.forEach(el => observer.observe(el));

    }

  }

