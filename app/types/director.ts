// Legacy (для director.ts / ProductionCard)
export type CardVariant = "plasma" | "finished";
export interface ProductionItem {
  id: string;
  code: string;
  time: string;
}
export interface ProductionCardData {
  variant: CardVariant;
  title: string;
  count?: number;
  items: ProductionItem[];
}

/** Элемент строки (новый формат test.json) */
export interface DirectorItem {
  vin: string;
  color_vin_font: string;
  order_number: string;
  color_order_number: string;
  color_box: string;
  date: string;
  color_date: string;
}

/** Секция (таб) из нового формата */
export interface DirectorSectionRaw {
  title: string;
  color_title_font: string;
  color_title_bg: string;
  data_waiting: DirectorItem[];
  data_started: DirectorItem[];
  data_finished: DirectorItem[];
}

/** Секция для рендера (с подставленными order_color, vin_color для шапки) */
export interface DirectorSection extends DirectorSectionRaw {
  /** Цвет кружка в шапке (берётся из первого item или дефолт) */
  order_color?: string;
  /** Цвет шрифта VIN (берётся из первого item или дефолт) */
  vin_color?: string;
  /** Показать в шапке это число вместо суммы по карточке (при разбиении на колонки) */
  displayTotalCount?: number;
}

/** Корневой объект из test.json */
export interface DirectorScreenDataRoot {
  color_bg?: string;
  color_lines?: string;
  [key: string]: DirectorSectionRaw | string | undefined;
}

export type DirectorScreenData = DirectorSection[];
