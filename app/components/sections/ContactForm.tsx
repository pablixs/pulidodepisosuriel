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

const WHATSAPP_NUMBER = "5491167455716";

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

function buildWhatsAppMessage(form: FormData): string {
  const servicio = form.tipoServicio === "Otro" ? form.otroServicio : form.tipoServicio;
  const zonaLabel = form.zona === "caba" ? "CABA" : "GBA";
  const zona = `${zonaLabel} - ${form.localidad}`;
  const superficie = form.m2 ? `${form.m2} m²` : "No especificada";

  if (form.tipo === "particular") {
    const nombre = `${form.nombre} ${form.apellido}`;
    const wave = String.fromCodePoint(0x1F44B);
    const bullet = String.fromCodePoint(0x1F539);
    let msg = `Hola! ${wave} Te dejo mi consulta para presupuesto:\n\n`;
    msg += `${bullet} Tipo: Particular\n`;
    msg += `${bullet} Nombre: ${nombre}\n`;
    msg += `${bullet} Telefono: ${form.telefono}\n`;
    msg += `${bullet} Servicio: ${servicio}\n`;
    msg += `${bullet} Zona: ${zona}\n`;
    msg += `${bullet} Superficie aprox.: ${superficie}\n`;
    if (form.comoNosConocio) {
      msg += `${bullet} Como nos conociste?: ${form.comoNosConocio}\n`;
    }
    msg += `\nEspero su respuesta, gracias!`;
    return msg;
  }

  const f = form as FormEmpresa;
  let msg = `Buenos dias, mi nombre es ${f.contacto} y me comunico en representacion de ${f.empresa} para solicitar un presupuesto.\n\n`;
  msg += `Datos de contacto:\n`;
  msg += `- Telefono: ${f.telefono}\n`;
  msg += `- Mail: ${f.mail}\n`;
  msg += `- Servicio solicitado: ${servicio}\n`;
  msg += `- Zona: ${zona}\n`;
  msg += `- Superficie aproximada: ${superficie}\n`;
  if (f.comoNosConocio) {
    msg += `- Como nos conocio?: ${f.comoNosConocio}\n`;
  }
  msg += `\nQuedo a la espera de su respuesta. Muchas gracias.`;
  return msg;
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactForm() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("particular");
  const [form, setForm] = useState<FormData>(initParticular());
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = () => {
    if (!validar()) return;
    const message = buildWhatsAppMessage(form);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const localidades = form.zona === "caba" ? LOCALIDADES_CABA
    : form.zona === "gba" ? LOCALIDADES_GBA : [];

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
            <button className="cf-btn cf-btn-whatsapp" onClick={handleSubmit}>
              {WA_ICON}
              Consultar por WhatsApp
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
