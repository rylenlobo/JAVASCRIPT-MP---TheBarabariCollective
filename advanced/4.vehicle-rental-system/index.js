// Abstract Vehicle class - Demonstrates Abstraction concept
class Vehicle {
  constructor(type, brand, pricePerDay) {
    if (this.constructor === Vehicle) {
      throw new Error("Cannot instantiate abstract class Vehicle");
    }
    this.type = type;
    this.brand = brand;
    this.pricePerDay = pricePerDay;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  // Abstract method to be implemented by child classes - Demonstrates Polymorphism
  rent(days) {
    throw new Error("rent() method must be implemented in child classes");
  }

  getDetails() {
    return `${this.brand} - $${this.pricePerDay}/day`;
  }
}

// Car class
class Car extends Vehicle {
  constructor(brand, pricePerDay, seats) {
    super("Car", brand, pricePerDay);
    this.seats = seats;
  }

  // Polymorphic implementation of rent method
  rent(days) {
    return `Rented a ${this.brand} car with ${
      this.seats
    } seats for ${days} days. Total cost: $${days * this.pricePerDay}`;
  }

  getDetails() {
    return `${this.brand} Car - $${this.pricePerDay}/day - ${this.seats} seats`;
  }
}

// Bike class
class Bike extends Vehicle {
  constructor(brand, pricePerDay, helmetIncluded) {
    super("Bike", brand, pricePerDay);
    this.helmetIncluded = helmetIncluded;
  }

  // Polymorphic implementation of rent method
  rent(days) {
    const helmetInfo = this.helmetIncluded
      ? "Helmet included"
      : "Helmet not included";
    return `Rented a ${
      this.brand
    } bike for ${days} days. ${helmetInfo}. Total cost: $${
      days * this.pricePerDay
    }`;
  }

  getDetails() {
    return `${this.brand} Bike - $${this.pricePerDay}/day - ${
      this.helmetIncluded ? "Helmet included" : "Helmet not included"
    }`;
  }
}

// Scooter class - Added new vehicle type
class Scooter extends Vehicle {
  constructor(brand, pricePerDay, electric) {
    super("Scooter", brand, pricePerDay);
    this.electric = electric;
  }

  // Polymorphic implementation of rent method
  rent(days) {
    const powerType = this.electric ? "Electric" : "Gas-powered";
    return `Rented a ${powerType} ${
      this.brand
    } scooter for ${days} days. Total cost: $${days * this.pricePerDay}`;
  }

  getDetails() {
    return `${this.brand} Scooter - $${this.pricePerDay}/day - ${
      this.electric ? "Electric" : "Gas-powered"
    }`;
  }
}

// LuxuryCar class - Added new vehicle type
class LuxuryCar extends Car {
  constructor(brand, pricePerDay, seats, chauffeurIncluded) {
    super(brand, pricePerDay, seats);
    this.type = "Luxury"; // Override the type
    this.chauffeurIncluded = chauffeurIncluded;
  }

  // Polymorphic implementation of rent method
  rent(days) {
    const chauffeurInfo = this.chauffeurIncluded
      ? "Chauffeur service included"
      : "Self-drive";
    return `Rented a luxury ${this.brand} car with ${
      this.seats
    } seats for ${days} days. ${chauffeurInfo}. Total cost: $${
      days * this.pricePerDay
    }`;
  }

  getDetails() {
    return `${this.brand} Luxury Car - $${this.pricePerDay}/day - ${
      this.seats
    } seats - ${this.chauffeurIncluded ? "Chauffeur included" : "Self-drive"}`;
  }
}

// Rental Service class - Demonstrates Composition
class RentalService {
  constructor() {
    this.vehicles = [];
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  getVehicleById(id) {
    return this.vehicles.find((v) => v.id === id);
  }

  listAvailableVehicles() {
    return this.vehicles
      .map((v) => `${v.brand} - ${v.type} - $${v.pricePerDay}/day`)
      .join("\n");
  }
}

// Initialize the rental service
const rentalService = new RentalService();

// Add various vehicles to demonstrate polymorphism
rentalService.addVehicle(new Car("Toyota Camry", 50, 5));
rentalService.addVehicle(new Car("Honda Civic", 45, 5));
rentalService.addVehicle(new Car("Tesla Model 3", 80, 5));
rentalService.addVehicle(new Car("Ford Mustang", 70, 2));
rentalService.addVehicle(new Bike("Yamaha", 25, true));
rentalService.addVehicle(new Bike("Honda CB", 20, true));
rentalService.addVehicle(new Bike("Suzuki", 22, false));
// Added new vehicle types
rentalService.addVehicle(new Scooter("Vespa", 30, false));
rentalService.addVehicle(new Scooter("Xiaomi", 35, true));
rentalService.addVehicle(new LuxuryCar("Mercedes S-Class", 120, 4, true));
rentalService.addVehicle(new LuxuryCar("BMW 7 Series", 110, 4, false));

// DOM elements
const vehiclesList = document.getElementById("vehicles-list");
const vehicleSelect = document.getElementById("vehicle-select");
const daysInput = document.getElementById("days");
const rentBtn = document.getElementById("rent-btn");
const rentalResult = document.getElementById("rental-result");

// Display available vehicles
function displayVehicles() {
  vehiclesList.innerHTML = "";
  vehicleSelect.innerHTML =
    '<option value="" disabled selected>Choose a vehicle</option>';

  rentalService.vehicles.forEach((vehicle) => {
    // Add to visual display
    const card = document.createElement("div");
    card.className = `vehicle-card ${vehicle.type.toLowerCase()}`;

    let additionalInfo = "";
    if (vehicle.type === "Car") {
      additionalInfo = `<p>Seats: ${vehicle.seats}</p>`;
    } else if (vehicle.type === "Bike") {
      additionalInfo = `<p>${
        vehicle.helmetIncluded ? "Helmet included" : "Helmet not included"
      }</p>`;
    } else if (vehicle.type === "Scooter") {
      additionalInfo = `<p>${
        vehicle.electric ? "Electric" : "Gas-powered"
      }</p>`;
    } else if (vehicle.type === "Luxury") {
      additionalInfo = `<p>Seats: ${vehicle.seats}, ${
        vehicle.chauffeurIncluded ? "Chauffeur included" : "Self-drive"
      }</p>`;
    }

    card.innerHTML = `
      <h3>${vehicle.brand}</h3>
      <p>Type: ${vehicle.type}</p>
      <p>Price: $${vehicle.pricePerDay} per day</p>
      ${additionalInfo}
    `;

    vehiclesList.appendChild(card);

    // Add to select dropdown
    const option = document.createElement("option");
    option.value = vehicle.id;
    option.textContent = vehicle.getDetails();
    vehicleSelect.appendChild(option);
  });
}

// Handle rent button click
rentBtn.addEventListener("click", () => {
  const selectedVehicleId = vehicleSelect.value;
  const days = parseInt(daysInput.value);

  if (!selectedVehicleId || isNaN(days) || days < 1) {
    alert("Please select a vehicle and enter a valid number of days");
    return;
  }

  const vehicle = rentalService.getVehicleById(selectedVehicleId);

  if (vehicle) {
    const result = vehicle.rent(days);
    rentalResult.innerHTML = result;
    rentalResult.className = "result success";
  }
});

// Initialize the display
document.addEventListener("DOMContentLoaded", displayVehicles);
