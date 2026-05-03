"use client";

import { useState } from "react";
import Titulos from "@/app/components/ui/Titulos";
// ─── Tipos ────────────────────────────────────────────────────────────────────

type TipoCliente = "particular" | "empresa";
type Zona = "caba" | "gba" | "";

interface FormParticular {
  tipo: "particular";
  nombre: string;
  apellido: string;
  telefono: string;
  tipoServicio: string;
  otroServicio: string;
  zona: Zona;
  localidad: string;
  m2: string;
  comoNosConocio: string;
}

interface FormEmpresa {
  tipo: "empresa";
  empresa: string;
  contacto: string;
  telefono: string;
  mail: string;
  tipoServicio: string;
  otroServicio: string;
  zona: Zona;
  localidad: string;
  m2: string;
  comoNosConocio: string;
}

type FormData = FormParticular | FormEmpresa;

// ─── Constantes ───────────────────────────────────────────────────────────────

const SERVICIOS = [
  "Pulido y Plastificado",
  "Hidrolaqueado",
  "Vitrificado / Termovitrificado",
  "Restauración de Pisos",
  "Tratamiento Ignífugo",
  "Otro",
];

const LOCALIDADES_CABA = [
  "Almagro", "Balvanera", "Belgrano", "Boedo", "Caballito",
  "Chacarita", "Coghlan", "Colegiales", "Constitución", "Flores",
  "Floresta", "La Boca", "Liniers", "Mataderos", "Monserrat",
  "Monte Castro", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda",
  "Paternal", "Puerto Madero", "Recoleta", "Retiro", "Saavedra",
  "San Cristóbal", "San Nicolás", "San Telmo", "Versalles", "Villa Crespo",
  "Villa del Parque", "Villa Devoto", "Villa Lugano", "Villa Luro",
  "Villa Ortúzar", "Villa Pueyrredón", "Villa Real", "Villa Riachuelo",
  "Villa Santa Rita", "Villa Urquiza", "Otro",
];

const LOCALIDADES_GBA = [
  "Avellaneda", "Berazategui", "Esteban Echeverría", "Ezeiza",
  "Florencio Varela", "General San Martín", "Hurlingham", "Ituzaingó",
  "José C. Paz", "La Matanza", "Lanús", "Lomas de Zamora",
  "Malvinas Argentinas", "Merlo", "Moreno", "Morón",
  "Quilmes", "San Fernando", "San Isidro", "San Miguel",
  "Tigre", "Tres de Febrero", "Vicente López", "Otro",
];

const COMO_NOS_CONOCIO = [
  "Google",
  "Instagram / Facebook",
  "Recomendación",
  "Cartel / Via pública",
  "Ya éramos clientes",
  "Otro",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const initParticular = (): FormParticular => ({
  tipo: "particular",
  nombre: "", apellido: "", telefono: "",
  tipoServicio: "", otroServicio: "",
  zona: "", localidad: "",
  m2: "", comoNosConocio: "",
});

const initEmpresa = (): FormEmpresa => ({
  tipo: "empresa",
  empresa: "", contacto: "", telefono: "", mail: "",
  tipoServicio: "", otroServicio: "",
  zona: "", localidad: "",
  m2: "", comoNosConocio: "",
});

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("particular");
  const [form, setForm] = useState<FormData>(initParticular());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // ── Cambio de tipo de cliente ──
  const handleTipoCliente = (tipo: TipoCliente) => {
    setTipoCliente(tipo);
    setErrors({});
    setForm(tipo === "particular" ? initParticular() : initEmpresa());
  };

  // ── Update de campos ──
  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const e = { ...prev }; delete e[key]; return e; });
  };

  // ── Validación ──
  const validar = (): boolean => {
    const e: Record<string, string> = {};
    const f = form;

    if (f.tipo === "particular") {
      if (!f.nombre.trim())    e.nombre    = "El nombre es obligatorio";
      if (!f.apellido.trim())  e.apellido  = "El apellido es obligatorio";
      if (!f.telefono.trim())  e.telefono  = "El teléfono es obligatorio";
      if (!f.tipoServicio)     e.tipoServicio = "Seleccioná un servicio";
      if (f.tipoServicio === "Otro" && !f.otroServicio.trim())
        e.otroServicio = "Indicá el tipo de trabajo";
    } else {
      if (!f.empresa.trim())   e.empresa   = "El nombre de la empresa es obligatorio";
      if (!f.contacto.trim())  e.contacto  = "El nombre de contacto es obligatorio";
      if (!f.telefono.trim())  e.telefono  = "El teléfono es obligatorio";
      if (!f.mail.trim())      e.mail      = "El mail es obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.mail))
        e.mail = "El mail no es válido";
      if (!f.tipoServicio)     e.tipoServicio = "Seleccioná un servicio";
      if (f.tipoServicio === "Otro" && !f.otroServicio.trim())
        e.otroServicio = "Indicá el tipo de trabajo";
    }

    if (!f.zona) e.zona = "Seleccioná la zona";
    if (!f.localidad) e.localidad = "Seleccioná la localidad";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!validar()) return;
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1200)); // reemplazá con tu lógica real
    setEnviando(false);
    setEnviado(true);
  };

  const localidades = form.zona === "caba"
    ? LOCALIDADES_CABA
    : form.zona === "gba"
    ? LOCALIDADES_GBA
    : [];

  // ── Pantalla de éxito ──
  if (enviado) {
    return (
      <>
        <Style />
        <section className="cf-wrap sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="cf-success">
            <div className="cf-success-icon">✓</div>
            <h3 className="cf-success-title">¡Información enviada!</h3>
            <p className="cf-success-text">
              Nos ponemos en contacto contigo a la brevedad.
            </p>
            <button className="cf-btn" onClick={() => { setEnviado(false); setForm(tipoCliente === "particular" ? initParticular() : initEmpresa()); }}>
              Enviar otra consulta
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Style />
      <section className="cf-wrap sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">


        <Titulos eyebrow="Solicitá tu presupuesto" lineTwo="Contactanos"/>
        {/* Toggle particular / empresa */}
        <div className="cf-toggle">
          <button
            className={`cf-toggle-btn${tipoCliente === "particular" ? " activo" : ""}`}
            onClick={() => handleTipoCliente("particular")}
          >
            Particular
          </button>
          <button
            className={`cf-toggle-btn${tipoCliente === "empresa" ? " activo" : ""}`}
            onClick={() => handleTipoCliente("empresa")}
          >
            Empresa
          </button>
        </div>

        <div className="cf-grid">

          {/* ── CAMPOS PARTICULARES ── */}
          {form.tipo === "particular" && (
            <>
              <Field label="Nombre" error={errors.nombre} required>
                <input className="cf-input" placeholder="Juan" value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)} />
              </Field>

              <Field label="Apellido" error={errors.apellido} required>
                <input className="cf-input" placeholder="García" value={form.apellido}
                  onChange={(e) => set("apellido", e.target.value)} />
              </Field>

              <Field label="Teléfono" error={errors.telefono} required className="cf-full">
                <input className="cf-input" placeholder="11 1234-5678" value={form.telefono}
                  onChange={(e) => set("telefono", e.target.value)} />
              </Field>
            </>
          )}

          {/* ── CAMPOS EMPRESA ── */}
          {form.tipo === "empresa" && (
            <>
              <Field label="Empresa" error={errors.empresa} required className="cf-full">
                <input className="cf-input" placeholder="Nombre de la empresa" value={(form as FormEmpresa).empresa}
                  onChange={(e) => set("empresa", e.target.value)} />
              </Field>

              <Field label="Persona de contacto" error={errors.contacto} required>
                <input className="cf-input" placeholder="Nombre y apellido" value={(form as FormEmpresa).contacto}
                  onChange={(e) => set("contacto", e.target.value)} />
              </Field>

              <Field label="Teléfono" error={errors.telefono} required>
                <input className="cf-input" placeholder="11 1234-5678" value={form.telefono}
                  onChange={(e) => set("telefono", e.target.value)} />
              </Field>

              <Field label="Mail" error={errors.mail} required className="cf-full">
                <input className="cf-input" type="email" placeholder="contacto@empresa.com"
                  value={(form as FormEmpresa).mail}
                  onChange={(e) => set("mail", e.target.value)} />
              </Field>
            </>
          )}

          {/* ── CAMPOS COMUNES ── */}

          {/* Tipo de servicio */}
          <Field label="Tipo de servicio" error={errors.tipoServicio} required className="cf-full">
            <div className="cf-chips">
              {SERVICIOS.map((s) => (
                <button
                  key={s}
                  className={`cf-chip${form.tipoServicio === s ? " activo" : ""}`}
                  onClick={() => { set("tipoServicio", s); if (s !== "Otro") set("otroServicio", ""); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>

          {form.tipoServicio === "Otro" && (
            <Field label="¿Qué tipo de trabajo necesitás?" error={errors.otroServicio} required className="cf-full">
              <input className="cf-input" placeholder="Describí brevemente el trabajo"
                value={form.otroServicio}
                onChange={(e) => set("otroServicio", e.target.value)} />
            </Field>
          )}

          {/* Zona */}
          <Field label="Zona" error={errors.zona} required>
            <div className="cf-chips">
              {[{ val: "caba", label: "CABA" }, { val: "gba", label: "GBA" }].map(({ val, label }) => (
                <button
                  key={val}
                  className={`cf-chip${form.zona === val ? " activo" : ""}`}
                  onClick={() => { set("zona", val); set("localidad", ""); }}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>

          {/* Localidad */}
          <Field label="Localidad" error={errors.localidad} required>
            <select
              className="cf-select"
              value={form.localidad}
              onChange={(e) => set("localidad", e.target.value)}
              disabled={!form.zona}
            >
              <option value="">
                {form.zona ? "Seleccioná tu localidad" : "Primero elegí la zona"}
              </option>
              {localidades.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </Field>

          {/* M2 — opcional */}
          <Field label="Superficie aproximada" hint="Opcional" className="cf-full">
            <div className="cf-input-suffix">
              <input className="cf-input" type="number" min="1" placeholder="Ej: 80"
                value={form.m2}
                onChange={(e) => set("m2", e.target.value)} />
              <span className="cf-suffix">m²</span>
            </div>
          </Field>

          {/* Cómo nos conoció — opcional */}
          <Field label="¿Cómo nos conociste?" hint="Opcional" className="cf-full">
            <div className="cf-chips">
              {COMO_NOS_CONOCIO.map((c) => (
                <button
                  key={c}
                  className={`cf-chip${form.comoNosConocio === c ? " activo" : ""}`}
                  onClick={() => set("comoNosConocio", form.comoNosConocio === c ? "" : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>

        </div>

        {/* Nota de campos obligatorios */}
        <p className="cf-nota">* Campos obligatorios</p>

        {/* Submit */}
        <div className="cf-footer">
          <button className="cf-btn" onClick={handleSubmit} disabled={enviando}>
            {enviando ? (
              <span className="cf-spinner" />
            ) : (
              <>Enviar información de contacto →</>
            )}
          </button>
        </div>

      </section>
    </>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label, hint, error, required, className = "", children,
}: {
  label: string; hint?: string; error?: string;
  required?: boolean; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={`cf-field ${className}`}>
      <label className="cf-label">
        {label}
        {required && <span className="cf-required"> *</span>}
        {hint && <span className="cf-hint"> — {hint}</span>}
      </label>
      {children}
      {error && <span className="cf-error">{error}</span>}
    </div>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

function Style() {
  return (
    <style>{`
      .cf-wrap {
        padding: 3rem 2rem 4rem;
        margin: 0 auto;
        position: relative;
      }

      /* ── Toggle ── */
      .cf-toggle {
        display: inline-flex;
        background: #eeebe6;
        border: 1px solid #d8d2c8;
        border-radius: 2px;
        padding: 3px;
        margin-bottom: 2.5rem;
        gap: 2px;
      }

      .cf-toggle-btn {
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 0.55rem 1.6rem;
        border: none;
        background: transparent;
        color: #8a8078;
        cursor: pointer;
        border-radius: 1px;
        transition: background 0.18s, color 0.18s;
      }

      .cf-toggle-btn.activo {
        background: #b8762a;
        color: #fff;
      }

      /* ── Grid ── */
      .cf-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem 2rem;
      }

      .cf-full { grid-column: 1 / -1; }

      /* ── Field ── */
      .cf-field {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
      }

      .cf-label {
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #4a4540;
      }

      .cf-required { color: #b8762a; }

      .cf-hint {
        font-weight: 400;
        letter-spacing: 0.05em;
        color: #8a8078;
        text-transform: none;
      }

      .cf-error {
        font-size: 0.75rem;
        color: #c0392b;
        font-family: var(--font-barlow), 'Barlow', sans-serif;
      }

      /* ── Inputs ── */
      .cf-input {
        width: 100%;
        background: #fff;
        border: 1px solid #d8d2c8;
        border-radius: 2px;
        padding: 0.7rem 0.9rem;
        font-family: var(--font-barlow), 'Barlow', sans-serif;
        font-size: 0.9rem;
        color: #1a1714;
        outline: none;
        transition: border-color 0.18s, box-shadow 0.18s;
        box-sizing: border-box;
      }

      .cf-input::placeholder { color: #b8b0a6; }

      .cf-input:focus {
        border-color: #b8762a;
        box-shadow: 0 0 0 3px rgba(184,118,42,0.12);
      }

      /* Input con sufijo m² */
      .cf-input-suffix {
        position: relative;
        display: flex;
        align-items: center;
      }

      .cf-input-suffix .cf-input { padding-right: 3rem; }

      .cf-suffix {
        position: absolute;
        right: 0.9rem;
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-size: 0.8rem;
        font-weight: 700;
        color: #8a8078;
        pointer-events: none;
      }

      /* ── Select ── */
      .cf-select {
        width: 100%;
        background: #fff;
        border: 1px solid #d8d2c8;
        border-radius: 2px;
        padding: 0.7rem 0.9rem;
        font-family: var(--font-barlow), 'Barlow', sans-serif;
        font-size: 0.9rem;
        color: #1a1714;
        outline: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8078' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.9rem center;
        padding-right: 2.5rem;
        cursor: pointer;
        transition: border-color 0.18s, box-shadow 0.18s;
        box-sizing: border-box;
      }

      .cf-select:focus {
        border-color: #b8762a;
        box-shadow: 0 0 0 3px rgba(184,118,42,0.12);
      }

      .cf-select:disabled {
        background-color: #f0ede8;
        color: #b8b0a6;
        cursor: not-allowed;
      }

      /* ── Chips ── */
      .cf-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .cf-chip {
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 0.4rem 0.9rem;
        border: 1px solid #d8d2c8;
        border-radius: 2px;
        background: #fff;
        color: #6b6058;
        cursor: pointer;
        transition: all 0.15s;
        white-space: nowrap;
      }

      .cf-chip:hover {
        border-color: #b8762a;
        color: #b8762a;
      }

      .cf-chip.activo {
        background: #b8762a;
        border-color: #b8762a;
        color: #fff;
      }

      /* ── Nota ── */
      .cf-nota {
        font-size: 0.75rem;
        color: #8a8078;
        margin: 1.5rem 0 0;
        font-family: var(--font-barlow), 'Barlow', sans-serif;
      }

      /* ── Footer ── */
      .cf-footer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
      }

      /* ── Botón ── */
      .cf-btn {
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 0.85rem 2.2rem;
        background: #1a1714;
        color: #f7f5f2;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background 0.18s, transform 0.12s;
        min-width: 220px;
        justify-content: center;
      }

      .cf-btn:hover:not(:disabled) { background: #b8762a; }
      .cf-btn:active:not(:disabled) { transform: scale(0.98); }
      .cf-btn:disabled { opacity: 0.6; cursor: not-allowed; }

      /* Spinner */
      .cf-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(247,245,242,0.3);
        border-top-color: #f7f5f2;
        border-radius: 50%;
        animation: cf-spin 0.7s linear infinite;
        display: inline-block;
      }

      @keyframes cf-spin { to { transform: rotate(360deg); } }

      /* ── Éxito ── */
      .cf-success {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 4rem 2rem;
        gap: 1.2rem;
      }

      .cf-success-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #b8762a;
        color: #fff;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-weight: 900;
      }

      .cf-success-title {
        font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
        font-size: 2rem;
        font-weight: 900;
        text-transform: uppercase;
        color: #1a1714;
        margin: 0;
      }

      .cf-success-text {
        color: #6b6058;
        font-size: 0.95rem;
        max-width: 400px;
        line-height: 1.65;
        margin: 0;
        font-family: var(--font-barlow), 'Barlow', sans-serif;
      }

      /* ── Responsive ── */
      @media (max-width: 600px) {
        .cf-wrap { padding: 2rem 1.2rem 3rem; }
        .cf-grid { grid-template-columns: 1fr; }
        .cf-full { grid-column: 1; }
        .cf-footer { justify-content: stretch; }
        .cf-btn { width: 100%; }
      }
    `}</style>
  );
}
