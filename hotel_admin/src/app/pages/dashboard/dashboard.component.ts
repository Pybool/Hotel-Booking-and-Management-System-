
import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import Swal from 'sweetalert2'

const PORT = 4200
const HOST = 'localhost'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private srcValues:string[] = []

  constructor(private renderer: Renderer2, private router: Router,
    ) {
      this.srcValues = [
        `http://${HOST}:${PORT}/assets/js/bundlee5ca.js?ver=3.2.3`,
        `http://${HOST}:${PORT}/assets/js/scriptse5ca.js?ver=3.2.3`,
        // `http://${HOST}:${PORT}/assets/js/demo-settingse5ca.js?ver=3.2.3`,
        `http://${HOST}:${PORT}/assets/js/charts/chart-hotele5ca.js?ver=3.2.3`,
      ]
    }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.srcValues.forEach((src)=>{
        this.loadScript(src);
      })
    },500)
  }
  loadScript(src:string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.querySelector('#dashboard-root'), script);
  }

}
