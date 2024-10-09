import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef)

  clickCount = signal(0)

  constructor(){
    effect(()=>{
      console.log(`clicked button ${this.clickCount()} times`)
    })
  }


  ngOnInit(): void {

   const subscription =  interval(1000).subscribe({
    next:(val)=>console.log(val)
   })

   this.destroyRef.onDestroy(()=>{
    subscription.unsubscribe()
   })
    
  }


  onClick(){
    this.clickCount.update((prevCount)=>prevCount+1)
  }



}
