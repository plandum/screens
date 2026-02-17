import type { DirectorScreenData } from "@/app/types/director";

/**
 * Пример данных в формате API для экрана директора.
 * Подставьте сюда ответ вашего API или загружайте через fetch/useSWR и т.п.
 */
export const directorSectionsSample: DirectorScreenData = [
  {
    title: "СБОРКА В СТАПЕЛЕ",
    color: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { VIN: "Х0Т978610P0003466", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "829 дн. 13 ч." },
      { VIN: "SPM160024", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "451 дн. 13 ч." },
      { VIN: "Х0Т988800T0007652", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "6 дн. 13 ч." },
      { VIN: "Х0Т988800T0007646", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "4 дн. 13 ч." },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "СВАРКА/ПРОВАРКА",
    color: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { VIN: "Х0Т988800T0007641", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "00 ч. 21 мин." },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "ДРОБЕСТРУЙКА",
    color: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { VIN: "Х0Т998810T2000062", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "3 ч. 30 мин." },
      { VIN: "Х0Т958930T0001917", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "1 ч. 34 мин." },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "УСТАНОВКА ОСЕЙ",
    color: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [
      { VIN: "BS1700015", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "4 дн. 4 ч." },
      { VIN: "Х0Т988800T0007638", _155: false, _431: false, color: "FFC300", condition: "waiting", date: "2 ч. 29 мин." },
    ],
    data_started: [],
    data_finished: [],
  },
  {
    title: "СОБРАНО СЕГОДНЯ",
    color: "064AA4",
    order_color: "7380B5",
    vin_color: "FFFFFF",
    data_waiting: [],
    data_started: [],
    data_finished: [
      { VIN: "Х0Т998810T2000060", _155: false, _431: false, color: "66DE4F", condition: "finished", date: "27 дн. 22 ч." },
      { VIN: "Х0Т988800T0007637", _155: false, _431: false, color: "66DE4F", condition: "finished", date: "26 дн. 21 ч." },
      { VIN: "Х0Т958930T0001916", _155: false, _431: false, color: "66DE4F", condition: "finished", date: "17 дн. 20 ч." },
    ],
  },
];
