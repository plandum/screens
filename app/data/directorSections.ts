import type { DirectorScreenData } from "@/app/types/director";

/**
 * Пример данных в формате API для экрана директора.
 * Подставьте сюда ответ вашего API или загружайте через fetch/useSWR и т.п.
 */
export const directorSectionsSample: DirectorScreenData = [
  {
    title: "СБОРКА В СТАПЕЛЕ",
    color_title_font: "FFFFFF",
    color_title_bg: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { vin: "Х0Т978610P0003466", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "829 дн. 13 ч.", color_date: "FFC300" },
      { vin: "SPM160024", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "451 дн. 13 ч.", color_date: "FFC300" },
      { vin: "Х0Т988800T0007652", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "6 дн. 13 ч.", color_date: "FFC300" },
      { vin: "Х0Т988800T0007646", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "4 дн. 13 ч.", color_date: "FFC300" },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "СВАРКА/ПРОВАРКА",
    color_title_font: "FFFFFF",
    color_title_bg: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { vin: "Х0Т988800T0007641", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "00 ч. 21 мин.", color_date: "FFC300" },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "ДРОБЕСТРУЙКА",
    color_title_font: "FFFFFF",
    color_title_bg: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { vin: "Х0Т998810T2000062", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "3 ч. 30 мин.", color_date: "FFC300" },
      { vin: "Х0Т958930T0001917", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "1 ч. 34 мин.", color_date: "FFC300" },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "УСТАНОВКА ОСЕЙ",
    color_title_font: "FFFFFF",
    color_title_bg: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { vin: "BS1700015", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "4 дн. 4 ч.", color_date: "FFC300" },
      { vin: "Х0Т988800T0007638", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "FFC300", date: "2 ч. 29 мин.", color_date: "FFC300" },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "СОБРАНО СЕГОДНЯ",
    color_title_font: "FFFFFF",
    color_title_bg: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [],
    data_started: [],
    data_finished: [
      { vin: "Х0Т998810T2000060", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "66DE4F", date: "27 дн. 22 ч.", color_date: "66DE4F" },
      { vin: "Х0Т988800T0007637", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "66DE4F", date: "26 дн. 21 ч.", color_date: "66DE4F" },
      { vin: "Х0Т958930T0001916", color_vin_font: "FFFFFF", order_number: "", color_order_number: "B3C3D2", color_box: "66DE4F", date: "17 дн. 20 ч.", color_date: "66DE4F" },
    ],
  },
];
