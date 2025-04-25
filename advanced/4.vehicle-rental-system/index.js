// Abstract Vehicle class - Represents a generic vehicle. Cannot be instantiated directly.
class Vehicle {
  constructor(type, brand, pricePerDay) {
    // Prevent instantiation of the abstract class
    if (this.constructor === Vehicle) {
      throw new Error("Cannot instantiate abstract class Vehicle");
    }
    this.type = type;
    this.brand = brand;
    this.pricePerDay = pricePerDay;
    // Generate a simple unique ID
    this.id = Math.random().toString(36).substr(2, 9);
  }

  // Abstract method for renting - must be implemented by subclasses
  rent(days) {
    throw new Error("rent() method must be implemented in child classes");
  }

  // Method to get basic vehicle details
  getDetails() {
    return `${this.brand} - $${this.pricePerDay}/day`;
  }
}

// Car class - Represents a car, inheriting from Vehicle
class Car extends Vehicle {
  constructor(brand, pricePerDay, seats) {
    super("Car", brand, pricePerDay); // Call parent constructor
    this.seats = seats; // Car-specific property
  }

  // Implementation of the rent method for Car
  rent(days) {
    return `Rented a ${this.brand} car with ${
      this.seats
    } seats for ${days} days. Total cost: $${days * this.pricePerDay}`;
  }

  // Overridden getDetails method to include car-specific info
  getDetails() {
    return `${this.brand} Car - $${this.pricePerDay}/day - ${this.seats} seats`;
  }
}

// Bike class - Represents a bike, inheriting from Vehicle
class Bike extends Vehicle {
  constructor(brand, pricePerDay, helmetIncluded) {
    super("Bike", brand, pricePerDay); // Call parent constructor
    this.helmetIncluded = helmetIncluded; // Bike-specific property
  }

  // Implementation of the rent method for Bike
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

  // Overridden getDetails method to include bike-specific info
  getDetails() {
    return `${this.brand} Bike - $${this.pricePerDay}/day - ${
      this.helmetIncluded ? "Helmet included" : "Helmet not included"
    }`;
  }
}

// Scooter class - Represents a scooter, inheriting from Vehicle
class Scooter extends Vehicle {
  constructor(brand, pricePerDay, electric) {
    super("Scooter", brand, pricePerDay); // Call parent constructor
    this.electric = electric; // Scooter-specific property
  }

  // Implementation of the rent method for Scooter
  rent(days) {
    const powerType = this.electric ? "Electric" : "Gas-powered";
    return `Rented a ${powerType} ${
      this.brand
    } scooter for ${days} days. Total cost: $${days * this.pricePerDay}`;
  }

  // Overridden getDetails method to include scooter-specific info
  getDetails() {
    return `${this.brand} Scooter - $${this.pricePerDay}/day - ${
      this.electric ? "Electric" : "Gas-powered"
    }`;
  }
}

// LuxuryCar class - Represents a luxury car, inheriting from Car
class LuxuryCar extends Car {
  constructor(brand, pricePerDay, seats, chauffeurIncluded) {
    super(brand, pricePerDay, seats); // Call parent (Car) constructor
    this.type = "Luxury"; // Override the type inherited from Car
    this.chauffeurIncluded = chauffeurIncluded; // LuxuryCar-specific property
  }

  // Implementation of the rent method for LuxuryCar
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

  // Overridden getDetails method to include luxury car-specific info
  getDetails() {
    return `${this.brand} Luxury Car - $${this.pricePerDay}/day - ${
      this.seats
    } seats - ${this.chauffeurIncluded ? "Chauffeur included" : "Self-drive"}`;
  }
}

// Rental Service class - Manages the collection of vehicles
class RentalService {
  constructor() {
    this.vehicles = []; // Array to hold vehicle instances
  }

  // Method to add a vehicle to the service
  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  // Method to find a vehicle by its unique ID
  getVehicleById(id) {
    return this.vehicles.find((v) => v.id === id);
  }

  // Method to list available vehicles (currently not used in the final output, but useful)
  listAvailableVehicles() {
    return this.vehicles
      .map((v) => `${v.brand} - ${v.type} - $${v.pricePerDay}/day`)
      .join("\n");
  }
}

// Initialize the rental service instance
const rentalService = new RentalService();

// Add various vehicle instances to the rental service
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

// DOM element references
const vehiclesList = document.getElementById("vehicles-list"); // Container for vehicle cards
const vehicleSelect = document.getElementById("vehicle-select"); // Dropdown for vehicle selection
const daysInput = document.getElementById("days"); // Input field for number of days
const rentBtn = document.getElementById("rent-btn"); // Button to initiate rental
const rentalResult = document.getElementById("rental-result"); // Div to display rental confirmation/error

// Function to display available vehicles in the HTML
function displayVehicles() {
  vehiclesList.innerHTML = ""; // Clear existing list
  vehicleSelect.innerHTML =
    '<option value="" disabled selected>Choose a vehicle</option>'; // Reset dropdown

  // Iterate over each vehicle in the rental service
  rentalService.vehicles.forEach((vehicle) => {
    // Create and populate the vehicle card element
    const card = document.createElement("div");
    card.className = `vehicle-card ${vehicle.type.toLowerCase()}`; // Add base and type-specific classes

    // Determine additional info based on vehicle type
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
      // Note: LuxuryCar also has 'seats', handled by its getDetails, but we add specific luxury info here
      additionalInfo = `<p>Seats: ${vehicle.seats}, ${
        vehicle.chauffeurIncluded ? "Chauffeur included" : "Self-drive"
      }</p>`;
    }

    // Set the inner HTML of the card
    card.innerHTML = `
      <h3>${vehicle.brand}</h3>
      <p>Type: ${vehicle.type}</p>
      <p>Price: $${vehicle.pricePerDay} per day</p>
      ${additionalInfo}
    `;

    // Append the card to the vehicles list container
    vehiclesList.appendChild(card);

    // Create and populate the option for the select dropdown
    const option = document.createElement("option");
    option.value = vehicle.id; // Use vehicle ID as the option value
    option.textContent = vehicle.getDetails(); // Use detailed description as option text
    vehicleSelect.appendChild(option);
  });
}

// Event listener for the rent button click
rentBtn.addEventListener("click", () => {
  const selectedVehicleId = vehicleSelect.value; // Get selected vehicle ID from dropdown
  const days = parseInt(daysInput.value); // Get number of days and convert to integer

  // Basic validation
  if (!selectedVehicleId || isNaN(days) || days < 1) {
    alert("Please select a vehicle and enter a valid number of days");
    return; // Stop execution if validation fails
  }

  // Find the selected vehicle object using its ID
  const vehicle = rentalService.getVehicleById(selectedVehicleId);

  // If the vehicle is found, call its rent method and display the result
  if (vehicle) {
    const result = vehicle.rent(days); // Call the polymorphic rent method
    rentalResult.innerHTML = result; // Display the result message
    rentalResult.className = "result success"; // Apply success styling
  }
  // Note: An else case for vehicle not found isn't strictly necessary here
  // because the dropdown is populated from existing vehicles, but could be added for robustness.
});

// Initial call to display vehicles when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayVehicles);
