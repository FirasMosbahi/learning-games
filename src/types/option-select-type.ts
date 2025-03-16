export class OptionSelectType {
  text: string;
  options: string[];
  missing: string;
}

export class MusicBoxGameData {
  level: number;
  image: string;
  data: OptionSelectType[];
}

export class AstronauteGameData {
  level: number;
  data: OptionSelectType[];
}
