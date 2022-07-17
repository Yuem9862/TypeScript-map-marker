//instructions to every other classes on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

//custom map class (facade of the Google map)
export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    const mapElement: HTMLElement | null = document.getElementById(divId);
    if (mapElement) {
      this.googleMap = new google.maps.Map(mapElement, {
        zoom: 1,
        center: { lat: 0, lng: 0 },
      });
    }
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
