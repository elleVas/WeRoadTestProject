// Moods.ts
export interface Moods {
  [key: string]: string;
}

export class Travel {
  id: string;
  name: string;
  description: string;
  price: number;
  description_extended: string;
  moods: Moods;
  maxCapacity: number;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    description_extended: string,
    moods: Moods,
    maxCapacity: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.description_extended = description_extended;
    this.moods = moods;
    this.maxCapacity = maxCapacity;
  }

}
