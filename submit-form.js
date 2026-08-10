// =========================================================
// Submit the "Midlandheatpumps Solar Contact" form to Supabase
// =========================================================
//
// Install: npm install @supabase/supabase-js
//
import { createClient } from '@supabase/supabase-js';

// Public anon key is safe to expose client-side — RLS policy above
// only allows INSERT, nothing else.
const supabase = createClient(
  'https://YOUR-PROJECT-REF.supabase.co',
  'YOUR-SUPABASE-ANON-KEY'
);

/**
 * @param {Object} formData
 * @param {string} formData.firstName
 * @param {string} formData.lastName
 * @param {string} formData.email
 * @param {string} [formData.phoneCountryCode]
 * @param {string} [formData.phone]
 * @param {string} [formData.addressLine1]
 * @param {string} [formData.addressLine2]
 * @param {string} [formData.city]
 * @param {string} [formData.county]
 * @param {string} [formData.postcode]
 * @param {string} [formData.country]
 * @param {boolean} [formData.existingCustomer]
 * @param {string} [formData.enquiryMessage]
 * @param {boolean} formData.processingConsent
 * @param {boolean} [formData.marketingConsent]
 */
async function submitContactForm(formData) {
  const { data, error } = await supabase
    .from('form_submissions')
    .insert([
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_country_code: formData.phoneCountryCode ?? 'UK',
        phone: formData.phone ?? null,
        address_line1: formData.addressLine1 ?? null,
        address_line2: formData.addressLine2 ?? null,
        city: formData.city ?? null,
        county: formData.county ?? null,
        postcode: formData.postcode ?? null,
        country: formData.country ?? 'Ireland',
        existing_customer: formData.existingCustomer ?? false,
        enquiry_message: formData.enquiryMessage ?? null,
        processing_consent: formData.processingConsent,
        marketing_consent: formData.marketingConsent ?? false,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting form:', error.message);
    throw error;
  }

  return data;
}

// --- Example usage, wired to a real <form> submit event ---
document.querySelector('#contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  try {
    await submitContactForm({
      firstName: form.firstname.value,
      lastName: form.lastname.value,
      email: form.email.value,
      phoneCountryCode: form.country_code?.value,
      phone: form.phone.value,
      addressLine1: form.address_line1?.value,
      addressLine2: form.address_line2?.value,
      city: form.city?.value,
      county: form.county?.value,
      postcode: form.postcode?.value,
      country: form.country?.value,
      existingCustomer: form.existing_customer?.checked,
      enquiryMessage: form.enquiry_message.value,
      processingConsent: form.processing_consent.checked,
      marketingConsent: form.marketing_consent?.checked,
    });
    alert('Thanks — your enquiry has been submitted!');
    form.reset();
  } catch (err) {
    alert('Something went wrong submitting the form. Please try again.');
  }
});

// =========================================================
// Alternative: raw REST call (no supabase-js dependency)
// =========================================================
async function submitContactFormRest(formData) {
  const response = await fetch(
    'https://YOUR-PROJECT-REF.supabase.co/rest/v1/form_submissions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: 'YOUR-SUPABASE-ANON-KEY',
        Authorization: 'Bearer YOUR-SUPABASE-ANON-KEY',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address_line1: formData.addressLine1,
        address_line2: formData.addressLine2,
        city: formData.city,
        county: formData.county,
        postcode: formData.postcode,
        country: formData.country ?? 'Ireland',
        existing_customer: formData.existingCustomer ?? false,
        enquiry_message: formData.enquiryMessage,
        processing_consent: formData.processingConsent,
        marketing_consent: formData.marketingConsent ?? false,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Submission failed');
  }

  return response.json();
}

export { submitContactForm, submitContactFormRest };
