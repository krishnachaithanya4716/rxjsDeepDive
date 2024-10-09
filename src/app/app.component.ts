import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef)

  clickCount = signal(0)

  clickCountObervable$ = toObservable(this.clickCount)
  intervalSignal = toSignal(interval(5000).pipe(map(val=>val*100)),{initialValue:1})


  constructor(){
    effect(()=>{
      console.log(`clicked button ${this.clickCount()} times`)
    })
  }


  ngOnInit(): void {

   const subscription =  interval(10000).subscribe({
    next:(val)=>console.log(val)
   })

   const clickcountSubscription = this.clickCountObervable$.subscribe({
    next:(val)=>console.log(`clicked button${val} times emitted from observable`)
   })

   this.destroyRef.onDestroy(()=>{
    subscription.unsubscribe()
   })
    
  }


  onClick(){
    this.clickCount.update((prevCount)=>prevCount+1)
  }



}
