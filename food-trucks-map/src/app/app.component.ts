import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';

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
    const url = `https://l90o7ash07.execute-api.us-east-1.amazonaws.com/api/v1/foodtrucks/bylocation?lat=${lat}&lon=${lon}`;
    this.http.get<any>(url).subscribe(response => {
      this.foodTrucks = response.food_trucks.map((truck: any) => ({
        position: { lat: truck.latitude, lng: truck.longitude },
        address: truck.address,
        description: truck.food_items,
      }));
    });
  }
}
