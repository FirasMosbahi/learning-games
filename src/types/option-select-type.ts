export class OptionSelectType {
  text: string[];
  options: string[];
  missing: string;
  missingImage: string;
  images: string[];
}

export class MultiSelectElement {
  options: string[];
  missing: string;
}

export class OptionMultiSelectType {
  text: string[];
  options: MultiSelectElement[];
}

export class FirstYearGameData {
  title: string;
  level: number;
  image: string;
  data: OptionSelectType[];
}

export class AstronauteGameData {
  level: number;
  data: OptionSelectType[];
}

export class SecondYearGameData {
  level: number;
  image: string;
  data: OptionMultiSelectType[];
}
