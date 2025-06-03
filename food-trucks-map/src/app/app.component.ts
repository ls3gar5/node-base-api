import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment'; // Ensure this import is correct based on your environment setup

@Component({
  selector: 'app-root',
  imports: [CommonModule, GoogleMapsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'food-trucks-map';
  center: google.maps.LatLngLiteral = { lat: 37.77551013804947, lng: -122.39099930600248 };
  zoom = 14;
  foodTrucks: any[] = [];
  
  constructor(private http: HttpClient) {
    this.loadFoodTrucks(this.center.lat, this.center.lng);
  }

  loadFoodTrucks(lat: number, lon: number) {
    const url = `${environment.API_URL}?lat=${lat}&lon=${lon}`;
    this.http.get<any>(url).subscribe(response => {
      this.foodTrucks = response.food_trucks.map((truck: any) => ({
        position: { lat: truck.latitude, lng: truck.longitude },
        address: truck.address,
        description: truck.food_items,
      }));
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
  if (event.latLng) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log('Map clicked at:', lat, lng);

    this.center = { lat, lng }; // optionally re-center the map
    this.loadFoodTrucks(lat, lng); // fetch new food truck data
  }
}
}
