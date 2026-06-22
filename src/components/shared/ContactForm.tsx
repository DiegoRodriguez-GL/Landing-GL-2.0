// ============================================================================
// GreenLock Cybersecurity — Contact Form (React Island)
// Honeypot anti-spam, client-side validation, Cloudflare Worker submission
// ============================================================================

import { useState, type FormEvent, type ChangeEvent } from 'react';

interface ContactFormProps {
  /** Additional field: company size (for /solicitar-auditoria) */
  showCompanySize?: boolean;
  /** Pre-selected service slug */
  defaultService?: string;
  /** Form source identifier */
  formSource?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  companySize: string;
  message: string;
  // Honeypot field — must remain empty
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

const SERVICES = [
  { value: '', label: 'Seleccionar servicio' },
  { value: 'pentesting-web', label: 'Pentesting Web' },
  { value: 'pentesting-movil', label: 'Pentesting Móvil' },
  { value: 'pentesting-infraestructura', label: 'Pentesting Infraestructura' },
  { value: 'red-team', label: 'Red Team' },
  { value: 'pentesting-as-a-service', label: 'Pentesting as a Service (PaaS)' },
  { value: 'auditoria-seguridad', label: 'Auditoría de Seguridad' },
  { value: 'cumplimiento-normativo', label: 'Cumplimiento Normativo' },
  { value: 'concienciacion-formacion', label: 'Concienciación y Formación' },
  { value: 'desarrollo-web', label: 'Desarrollo Web' },
  { value: 'desarrollo-movil', label: 'Desarrollo Móvil' },
  { value: 'chatbots-ia', label: 'Chatbots IA' },
  { value: 'automatizacion-apis', label: 'Automatización y APIs' },
  { value: 'otro', label: 'Otro / No estoy seguro' },
];

const COMPANY_SIZES = [
  { value: '', label: 'Seleccionar tamaño' },
  { value: '1-10', label: '1–10 empleados' },
  { value: '10-50', label: '10–50 empleados' },
  { value: '50-200', label: '50–200 empleados' },
  { value: '200+', label: '200+ empleados' },
];

const FORM_ENDPOINT = '/api/contact';

export default function ContactForm({
  showCompanySize = false,
  defaultService = '',
  formSource = 'contact',
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: defaultService,
    companySize: '',
    message: '',
    website: '', // Honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un email válido';
    } else if (/\@(gmail|hotmail|yahoo|outlook|live|icloud|protonmail)\./i.test(formData.email)) {
      // Suggest corporate email but don't block
      // newErrors.email = 'Preferimos un email corporativo';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'La empresa es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Honeypot check: if the hidden field has a value, it's a bot
    if (formData.website) {
      // Silently "succeed" for bots
      setStatus('success');
      return;
    }

    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: formData.service,
          companySize: formData.companySize,
          message: formData.message.trim(),
          source: formSource,
          timestamp: Date.now(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Redirect to thank you page after a brief delay
        setTimeout(() => {
          window.location.href = '/gracias';
        }, 1500);
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Error al enviar el formulario');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Ha ocurrido un error. Por favor, inténtalo de nuevo o escríbenos a info@greenlock.tech.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Mensaje enviado</h3>
        <p className="text-gray-500">
          Gracias por contactarnos. Te responderemos en menos de 48 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from humans, visible to bots */}
      <div className="absolute -left-[9999px] -top-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors
            ${errors.name
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:border-[#059669] focus:ring-[#059669]/20'
            }
            bg-white focus:outline-none focus:ring-2`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email corporativo <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@empresa.com"
          required
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors
            ${errors.email
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:border-[#059669] focus:ring-[#059669]/20'
            }
            bg-white focus:outline-none focus:ring-2`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
          Empresa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nombre de tu empresa"
          required
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors
            ${errors.company
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:border-[#059669] focus:ring-[#059669]/20'
            }
            bg-white focus:outline-none focus:ring-2`}
        />
        {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
      </div>

      {/* Company Size (only for audit request) */}
      {showCompanySize && (
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tamaño de empresa
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-colors"
          >
            {COMPANY_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Service of Interest */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
          Servicio de interés
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-colors"
        >
          {SERVICES.map((svc) => (
            <option key={svc.value} value={svc.value}>
              {svc.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mensaje <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Cuéntanos brevemente qué necesitas..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20 focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] focus:outline-none focus:ring-2 focus:ring-[#059669]/50 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Al enviar aceptas nuestra{' '}
        <a href="/legal/privacidad" className="underline hover:text-gray-600 transition-colors">
          política de privacidad
        </a>
        . Respondemos en menos de 48h.
      </p>
    </form>
  );
}
