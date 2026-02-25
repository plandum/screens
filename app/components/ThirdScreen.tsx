"use client";

type PlasmaRow = {
  vin: string;
  order: string;
  time: string;
  accent: "orange" | "blue" | "green" | "yellow";
  marker?: "green" | "yellow";
};

type ComplectationRow = {
  vin: string;
  badge431: boolean;
  badge355: boolean;
  order: string;
  time: string;
  accent: "green" | "yellow";
};

type PlasmaCard = {
  title: string;
  count: number;
  rows: PlasmaRow[];
};

const palette = {
  cardBg: "#020814",
  rowBg: "#050f1f",
  rowBorder: "#49667E",
  headerBlue: "#1351A1",
  headerGreen: "#047035",
  orange: "#ff9a2a",
  blue: "#79d3ff",
  green: "#42e63e",
  yellow: "#e8e01a",
} as const;

const col1: PlasmaCard[] = [
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "1д 16ч", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "ХОТ771540Т009631", order: "280411-0730-502/004", time: "08:54", accent: "orange" },
      { vin: "SPM 168304", order: "240325-1630-129/005", time: "16:12", accent: "blue" },
      { vin: "ХОТ334870Т002956", order: "310125-1010-390/003", time: "10:05", accent: "blue" },
      { vin: "ХОТ558920Т004217", order: "250125-0915-337/002", time: "13:39", accent: "blue" },
    ],
  },
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "ХОТ771540Т009631", order: "280411-0730-502/004", time: "08:54", accent: "orange" },
    ],
  },
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "ХОТ771540Т009631", order: "280411-0730-502/004", time: "08:54", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "SPM 168304", order: "240325-1630-129/005", time: "16:12", accent: "blue" },
      { vin: "ХОТ334870Т002956", order: "310125-1010-390/003", time: "10:05", accent: "blue" },
      { vin: "ХОТ558920Т004217", order: "250125-0915-337/002", time: "13:39", accent: "blue" },
      { vin: "SPM 182667", order: "310125-1010-390/003", time: "16:52", accent: "blue" },
      { vin: "ХОТ556712Т002943", order: "230326-1420-396/005", time: "15:02", accent: "blue" },
      { vin: "ХОТ815904Т003267", order: "280126-0830-219/004", time: "09:56", accent: "blue" },
    ],
  },
];

const col2: PlasmaCard[] = [
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "ХОТ771540Т009631", order: "280411-0730-502/004", time: "08:54", accent: "orange" },
    ],
  },
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange" },
      { vin: "ХОТ771540Т009631", order: "280411-0730-502/004", time: "08:54", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "SPM 168304", order: "240325-1630-129/005", time: "16:12", accent: "blue" },
      { vin: "ХОТ334870Т002956", order: "310125-1010-390/003", time: "10:05", accent: "blue" },
      { vin: "ХОТ558920Т004217", order: "250125-0915-337/002", time: "13:39", accent: "blue" },
      { vin: "SPM 182667", order: "310125-1010-390/003", time: "16:52", accent: "blue" },
      { vin: "ХОТ556712Т002943", order: "230326-1420-396/005", time: "15:02", accent: "blue" },
      { vin: "ХОТ815904Т003267", order: "280126-0830-219/004", time: "09:56", accent: "blue" },
    ],
  },
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "SPM 168304", order: "240325-1630-129/005", time: "16:12", accent: "blue" },
      { vin: "ХОТ334870Т002956", order: "310125-1010-390/003", time: "10:05", accent: "blue" },
      { vin: "ХОТ558920Т004217", order: "250125-0915-337/002", time: "13:39", accent: "blue" },
    ],
  },
];

const col3: PlasmaCard[] = [
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange" },
      { vin: "ХОТ771540Т009631", order: "280411-0730-502/004", time: "08:54", accent: "orange" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "SPM 168304", order: "240325-1630-129/005", time: "16:12", accent: "blue" },
      { vin: "ХОТ334870Т002956", order: "310125-1010-390/003", time: "10:05", accent: "blue" },
      { vin: "ХОТ558920Т004217", order: "250125-0915-337/002", time: "13:39", accent: "blue" },
      { vin: "SPM 182667", order: "310125-1010-390/003", time: "16:52", accent: "blue" },
      { vin: "ХОТ556712Т002943", order: "230326-1420-396/005", time: "15:02", accent: "blue" },
      { vin: "ХОТ815904Т003267", order: "280126-0830-219/004", time: "09:56", accent: "blue" },
    ],
  },
  {
    title: "Плазменная резка",
    count: 431,
    rows: [
      { vin: "ХОТ988800Т0007600", order: "260211-0300-0036/002", time: "12:56", accent: "orange", marker: "green" },
      { vin: "SPM 160035", order: "251125-0200-1986/002", time: "15:47", accent: "orange" },
      { vin: "SPM 168304", order: "240325-1630-129/005", time: "16:12", accent: "blue" },
      { vin: "ХОТ334870Т002956", order: "310125-1010-390/003", time: "10:05", accent: "blue", marker: "yellow" },
      { vin: "ХОТ556712Т002943", order: "230326-1420-396/005", time: "15:02", accent: "blue" },
      { vin: "ХОТ558920Т004217", order: "250125-0915-337/002", time: "13:39", accent: "blue", marker: "green" },
    ],
  },
];

const complectationRows: ComplectationRow[] = [
  {
    vin: "XOT988800T0007600",
    badge431: true,
    badge355: false,
    order: "260211-0300-0036/002",
    time: "12:56",
    accent: "yellow",
  },
  {
    vin: "XOT988800T0007600",
    badge431: false,
    badge355: true,
    order: "260211-0300-0036/002",
    time: "15:02",
    accent: "yellow",
  },
  {
    vin: "XOT988800T0007600",
    badge431: true,
    badge355: true,
    order: "260211-0300-0036/002",
    time: "13:39",
    accent: "green",
  },
];

function colorByAccent(accent: PlasmaRow["accent"] | ComplectationRow["accent"]) {
  if (accent === "orange") return palette.orange;
  if (accent === "blue") return palette.blue;
  if (accent === "green") return palette.green;
  return palette.yellow;
}

function markerColor(marker: "green" | "yellow") {
  return marker === "green" ? palette.green : palette.yellow;
}

function BadgeSlot({ label, active }: { label: "431" | "355"; active: boolean }) {
  return (
    <span
      className={
        active
          ? "h-7 min-w-[44px] px-2 rounded-sm text-[20px] leading-[20px] font-semibold text-[#001722] bg-[#45eb3d] flex items-center justify-center tabular-nums"
          : "h-7 min-w-[44px] px-2 rounded-sm bg-[#2a4129] flex items-center justify-center"
      }
    >
      {active ? label : ""}
    </span>
  );
}

function PlasmaCardView({ card }: { card: PlasmaCard }) {
  return (
    <article className="rounded-[8px] overflow-hidden bg-[#020814] border border-[#111827] shadow-[0_0_12px_rgba(0,0,0,0.6)]">
      <header className="h-11 flex items-center gap-3 px-4" style={{ backgroundColor: palette.headerBlue }}>
        <span className="w-7 h-7 rounded-full bg-white shrink-0" />
        <h2 className="text-[24px] leading-[28px] text-white font-medium flex-1 truncate">{card.title}</h2>
        <span className="text-[24px] leading-[28px] text-white font-medium tabular-nums">{card.count}</span>
      </header>

      <div className="bg-[#020814] py-1">
        {card.rows.map((row, index) => {
          const accentColor = colorByAccent(row.accent);
          return (
            <div
              key={`${row.vin}-${row.order}-${index}`}
              className="h-[50px] px-[10px] pr-3 border-t flex items-center gap-3"
              style={{ backgroundColor: palette.rowBg, borderColor: palette.rowBorder }}
            >
              <span className="w-[10px] h-[36px] rounded-sm shrink-0" style={{ backgroundColor: accentColor }} />
              <span className="w-[200px] text-[16px] leading-[18px] text-[#f2f7ff] truncate">{row.vin}</span>
              <span className="w-[210px] text-[13px] leading-[17px] text-[#9fb5cc] truncate">{row.order}</span>
              {row.marker ? <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: markerColor(row.marker) }} /> : <span className="w-4 h-4 shrink-0" />}
              <span className="ml-auto text-[20px] leading-[22px] tabular-nums" style={{ color: accentColor }}>{row.time}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function ComplectationCard() {
  return (
    <article className="rounded-[8px] overflow-hidden bg-[#020814] border border-[#111827] shadow-[0_0_12px_rgba(0,0,0,0.6)]">
      <header className="h-11 flex items-center gap-3 px-4" style={{ backgroundColor: palette.headerGreen }}>
        <span className="w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: palette.yellow }} />
        <h2 className="text-[24px] leading-[28px] text-white font-medium truncate">Комплектация</h2>
      </header>

      <div className="bg-[#020814] py-1">
        {complectationRows.map((row, index) => {
          const accentColor = colorByAccent(row.accent);
          return (
            <div
              key={`${row.vin}-${row.order}-${index}`}
              className="h-[82px] px-[10px] pr-3 border-t flex items-center gap-2"
              style={{ backgroundColor: palette.rowBg, borderColor: palette.rowBorder }}
            >
              <span
                className="w-[10px] h-[58px] rounded-sm shrink-0"
                style={{ backgroundColor: row.accent === "green" ? palette.green : palette.yellow }}
              />
              <div className="w-[220px] min-w-0 flex flex-col justify-center gap-2">
                <span className="text-[16px] leading-[18px] text-[#f2f7ff] truncate">{row.vin}</span>
                <div className="flex items-center gap-2">
                  <BadgeSlot label="431" active={row.badge431} />
                  <BadgeSlot label="355" active={row.badge355} />
                </div>
              </div>
              <span className="w-[180px] text-[13px] leading-[17px] text-[#9fb5cc] truncate">{row.order}</span>
              <span className="text-[20px] leading-[22px] tabular-nums" style={{ color: accentColor }}>{row.time}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export function ThirdScreen({ pageBg }: { pageBg: string }) {
  return (
    <div className="h-screen w-screen overflow-hidden text-white p-6 box-border" style={{ backgroundColor: pageBg }}>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-0 overflow-hidden min-w-0">
        <section className="h-full min-h-0 space-y-6 lg:pr-3 lg:border-r lg:border-white/20">
          {col1.map((card, idx) => (
            <PlasmaCardView key={`c1-${idx}`} card={card} />
          ))}
        </section>

        <section className="h-full min-h-0 space-y-6 lg:px-3 lg:border-r lg:border-white/20">
          {col2.map((card, idx) => (
            <PlasmaCardView key={`c2-${idx}`} card={card} />
          ))}
        </section>

        <section className="h-full min-h-0 space-y-6 lg:px-3 lg:border-r lg:border-white/20">
          {col3.map((card, idx) => (
            <PlasmaCardView key={`c3-${idx}`} card={card} />
          ))}
        </section>

        <section className="h-full min-h-0 lg:pl-3">
          <ComplectationCard />
        </section>
      </div>
    </div>
  );
}
