"use client";

import { useState } from "react";
import Reveal from "@/app/components/ui/Reveal";

type TipoCliente = "particular" | "empresa";
type Zona = "caba" | "gba" | "";

interface FormParticular {
  tipo: "particular";
  nombre: string; apellido: string; telefono: string;
  tipoServicio: string; otroServicio: string;
  zona: Zona; localidad: string;
  m2: string; comoNosConocio: string;
}

interface FormEmpresa {
  tipo: "empresa";
  empresa: string; contacto: string; telefono: string; mail: string;
  tipoServicio: string; otroServicio: string;
  zona: Zona; localidad: string;
  m2: string; comoNosConocio: string;
}

type FormData = FormParticular | FormEmpresa;

const SERVICIOS = [
  "Pulido y Plastificado", "Hidrolaqueado", "Vitrificado / Termovitrificado",
  "Restauración de Pisos", "Pulido de Mármol", "Pulido de Hormigón", "Otro",
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
  "Google", "Instagram / Facebook", "Recomendación",
  "Cartel / Vía pública", "Ya éramos clientes", "Otro",
];

const initParticular = (): FormParticular => ({
  tipo: "particular", nombre: "", apellido: "", telefono: "",
  tipoServicio: "", otroServicio: "", zona: "", localidad: "",
  m2: "", comoNosConocio: "",
});

const initEmpresa = (): FormEmpresa => ({
  tipo: "empresa", empresa: "", contacto: "", telefono: "", mail: "",
  tipoServicio: "", otroServicio: "", zona: "", localidad: "",
  m2: "", comoNosConocio: "",
});

export default function ContactForm() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("particular");
  const [form, setForm] = useState<FormData>(initParticular());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleTipoCliente = (tipo: TipoCliente) => {
    setTipoCliente(tipo);
    setErrors({});
    setForm(tipo === "particular" ? initParticular() : initEmpresa());
  };

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const e = { ...prev }; delete e[key]; return e; });
  };

  const validar = (): boolean => {
    const e: Record<string, string> = {};
    const f = form;
    if (f.tipo === "particular") {
      if (!f.nombre.trim())   e.nombre   = "El nombre es obligatorio";
      if (!f.apellido.trim()) e.apellido = "El apellido es obligatorio";
      if (!f.telefono.trim()) e.telefono = "El teléfono es obligatorio";
      if (!f.tipoServicio)    e.tipoServicio = "Seleccioná un servicio";
      if (f.tipoServicio === "Otro" && !f.otroServicio.trim())
        e.otroServicio = "Indicá el tipo de trabajo";
    } else {
      if (!f.empresa.trim())  e.empresa  = "El nombre de la empresa es obligatorio";
      if (!f.contacto.trim()) e.contacto = "El nombre de contacto es obligatorio";
      if (!f.telefono.trim()) e.telefono = "El teléfono es obligatorio";
      if (!f.mail.trim())     e.mail     = "El mail es obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.mail))
        e.mail = "El mail no es válido";
      if (!f.tipoServicio)    e.tipoServicio = "Seleccioná un servicio";
      if (f.tipoServicio === "Otro" && !f.otroServicio.trim())
        e.otroServicio = "Indicá el tipo de trabajo";
    }
    if (!f.zona)      e.zona      = "Seleccioná la zona";
    if (!f.localidad) e.localidad = "Seleccioná la localidad";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1200));
    setEnviando(false);
    setEnviado(true);
  };

  const localidades = form.zona === "caba" ? LOCALIDADES_CABA
    : form.zona === "gba" ? LOCALIDADES_GBA : [];

  if (enviado) {
    return (
      <section id="contacto" className="cf-section">
        <div className="cf-inner">
          <Reveal>
            <div className="cf-success">
              <div className="cf-success-icon">✓</div>
              <h3 className="cf-success-title">¡Información enviada!</h3>
              <p className="cf-success-text">
                Nos comunicamos a la brevedad. Mientras tanto, podés ver 
                nuestros trabajos en la galería.
              </p>
              <button className="cf-btn" onClick={() => {
                setEnviado(false);
                setForm(tipoCliente === "particular" ? initParticular() : initEmpresa());
              }}>
                Enviar otra consulta
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="cf-section">
      <div className="cf-inner">
        <Reveal>
          <div className="cf-header">
            <span className="section-eyebrow">Contacto</span>
            <h2 className="section-title">
              Solicitar<br />
              <span>presupuesto</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
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
        </Reveal>

        <div className="cf-grid">
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

          {form.tipo === "empresa" && (
            <>
              <Field label="Empresa" error={errors.empresa} required className="cf-full">
                <input className="cf-input" placeholder="Nombre de la empresa"
                  value={(form as FormEmpresa).empresa}
                  onChange={(e) => set("empresa", e.target.value)} />
              </Field>
              <Field label="Persona de contacto" error={errors.contacto} required>
                <input className="cf-input" placeholder="Nombre y apellido"
                  value={(form as FormEmpresa).contacto}
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

          <Field label="Tipo de servicio" error={errors.tipoServicio} required className="cf-full">
            <div className="cf-chips">
              {SERVICIOS.map((s) => (
                <button key={s}
                  className={`cf-chip${form.tipoServicio === s ? " activo" : ""}`}
                  onClick={() => { set("tipoServicio", s); if (s !== "Otro") set("otroServicio", ""); }}>
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

          <Field label="Zona" error={errors.zona} required>
            <div className="cf-chips">
              {[{ val: "caba", label: "CABA" }, { val: "gba", label: "GBA" }].map(({ val, label }) => (
                <button key={val}
                  className={`cf-chip${form.zona === val ? " activo" : ""}`}
                  onClick={() => { set("zona", val); set("localidad", ""); }}>
                  {label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Localidad" error={errors.localidad} required>
            <select className="cf-select" value={form.localidad}
              onChange={(e) => set("localidad", e.target.value)} disabled={!form.zona}>
              <option value="">{form.zona ? "Seleccioná tu localidad" : "Primero elegí la zona"}</option>
              {localidades.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>

          <Field label="Superficie aproximada" hint="Opcional" className="cf-full">
            <div className="cf-input-suffix">
              <input className="cf-input" type="number" min="1" placeholder="Ej: 80"
                value={form.m2} onChange={(e) => set("m2", e.target.value)} />
              <span className="cf-suffix">m²</span>
            </div>
          </Field>

          <Field label="¿Cómo nos conociste?" hint="Opcional" className="cf-full">
            <div className="cf-chips">
              {COMO_NOS_CONOCIO.map((c) => (
                <button key={c}
                  className={`cf-chip${form.comoNosConocio === c ? " activo" : ""}`}
                  onClick={() => set("comoNosConocio", form.comoNosConocio === c ? "" : c)}>
                  {c}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <Reveal delay={200}>
          <p className="cf-nota">* Campos obligatorios</p>

          <div className="cf-footer">
            <button className="cf-btn" onClick={handleSubmit} disabled={enviando}>
              {enviando ? <span className="cf-spinner" /> : <>Enviar consulta →</>}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, hint, error, required, className = "", children }: {
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