import { useState } from "react";
export default function App() {
  const [mode, setMode] = useState(1);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const modes = [
    { id: 1, label: "استخراج نسبة من مبلغ", icon: "%" },
    { id: 2, label: "نسبة رقم من رقم", icon: "÷" },
    { id: 3, label: "إضافة نسبة (زيادة)", icon: "+" },
    { id: 4, label: "خصم نسبة (تخفيض)", icon: "−" },
  ];
  const configs = {
    1: { labelA: "النسبة %", labelB: "المبلغ", placeholder: ["15", "200"] },
    2: { labelA: "الرقم الأول", labelB: "الرقم الثاني", placeholder: ["50", "200"] },
    3: { labelA: "النسبة %", labelB: "المبلغ الأصلي", placeholder: ["15", "200"] },
    4: { labelA: "نسبة الخصم %", labelB: "السعر الأصلي", placeholder: ["20", "500"] },
  };
  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB) || numB === 0) return;
    if (mode === 1) setResult({ value: (numA / 100) * numB, label: "النتيجة", suffix: "", extra: null });
    else if (mode === 2) setResult({ value: (numA / numB) * 100, label: "النسبة", suffix: "%", extra: null });
    else if (mode === 3) {
      const added = (numA / 100) * numB;
      setResult({ value: numB + added, label: "المبلغ بعد الإضافة", suffix: "", extra: `المضاف: ${added.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}` });
    } else {
      const disc = (numA / 100) * numB;
      setResult({ value: numB - disc, label: "السعر بعد الخصم", suffix: "", extra: `الخصم: ${disc.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}` });
    }
  };
  const cfg = configs[mode];
  const colors = { 1: "#a855f7", 2: "#3b82f6", 3: "#10b981", 4: "#f59e0b" };
  const color = colors[mode];
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Cairo, sans-serif", padding: "20px", direction: "rtl" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" }}>
            حاسبة النسبة المئوية
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", marginTop: "6px" }}>اختر العملية التي تريدها</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {modes.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setResult(null); setA(""); setB(""); }} style={{
              padding: "14px 12px",
              borderRadius: "14px",
              border: mode === m.id ? `1.5px solid ${colors[m.id]}` : "1.5px solid rgba(255,255,255,0.08)",
              background: mode === m.id ? `${colors[m.id]}18` : "rgba(255,255,255,0.03)",
              color: mode === m.id ? colors[m.id] : "rgba(255,255,255,0.4)",
              fontFamily: "Cairo, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s",
              lineHeight: 1.4,
            }}>
              <div style={{ fontSize: "22px", marginBottom: "4px" }}>{m.icon}</div>
              {m.label}
            </button>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", padding: "28px" }}>
          {[0, 1].map(i => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                {i === 0 ? cfg.labelA : cfg.labelB}
              </label>
              <input
                type="number"
                value={i === 0 ? a : b}
                onChange={e => i === 0 ? setA(e.target.value) : setB(e.target.value)}
                placeholder={cfg.placeholder[i]}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: "12px",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff", fontSize: "20px",
                  fontFamily: "Cairo, sans-serif", fontWeight: 700,
                  outline: "none", boxSizing: "border-box", textAlign: "right",
                  transition: "border 0.2s",
                }}
                onFocus={e => e.target.style.border = `1.5px solid ${color}`}
                onBlur={e => e.target.style.border = "1.5px solid rgba(255,255,255,0.1)"}
              />
            </div>
          ))}
          <button onClick={calculate} style={{
            width: "100%", padding: "16px", borderRadius: "14px", border: "none",
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            color: "#fff", fontSize: "17px",
            fontFamily: "Cairo, sans-serif", fontWeight: 800,
            cursor: "pointer", marginTop: "8px",
            boxShadow: `0 8px 24px ${color}44`,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            احسب ←
          </button>
          {result !== null && (
            <div style={{
              marginTop: "20px",
              background: `${color}12`,
              border: `1px solid ${color}44`,
              borderRadius: "14px",
              padding: "20px",
              textAlign: "center",
            }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", margin: "0 0 6px", fontWeight: 600 }}>
                {result.label}
              </p>
              <p style={{ color, fontSize: "44px", fontWeight: 900, margin: 0, letterSpacing: "-1px" }}>
                {result.value.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}{result.suffix}
              </p>
              {result.extra && (
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: "8px 0 0", fontWeight: 600 }}>
                  {result.extra}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
}
