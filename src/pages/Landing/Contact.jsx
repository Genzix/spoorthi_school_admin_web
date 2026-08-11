import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';
import Reveal from './Reveal';
import {
  Body,
  BtnPrimary,
  Container,
  Eyebrow,
  Headline,
  Section,
} from './styles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(1.5rem, 4vw, 2.75rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.1rem;
`;

const InfoItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem;
  align-items: start;

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.55rem;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--lp-gold) 16%, #fff);
    color: var(--lp-navy);
    font-size: 1.1rem;
  }

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 0.98rem;
    color: var(--lp-navy);
    margin-bottom: 0.15rem;
  }

  span,
  a {
    font-family: var(--lp-font-body);
    font-size: 0.95rem;
    color: var(--lp-muted);
    text-decoration: none;
    line-height: 1.5;
  }

  a:hover {
    color: var(--lp-navy);
  }
`;

const FormCard = styled.form`
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  border-radius: 1rem;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  box-shadow: 0 16px 40px rgba(11, 31, 58, 0.06);
  display: grid;
  gap: 0.85rem;
`;

const Field = styled.label`
  display: grid;
  gap: 0.35rem;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--lp-navy);

  input,
  textarea {
    width: 100%;
    border: 1px solid color-mix(in srgb, var(--lp-navy) 14%, transparent);
    border-radius: 0.45rem;
    padding: 0.75rem 0.85rem;
    font: inherit;
    font-weight: 500;
    color: var(--lp-ink);
    background: #fbfcfe;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--lp-navy);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--lp-gold) 28%, transparent);
      background: #fff;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Success = styled.p`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  font-family: var(--lp-font-body);
  font-size: 0.92rem;
  font-weight: 600;
  color: #1b7a45;
`;

const MapWrap = styled.div`
  margin-top: 2rem;
  border-radius: 1rem;
  overflow: hidden;
  min-height: 220px;
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--lp-navy) 8%, #e8edf5),
      #f3f5f8
    );
  border: 1px solid color-mix(in srgb, var(--lp-navy) 8%, transparent);
  display: grid;
  place-items: center;
  font-family: var(--lp-font-body);
  color: var(--lp-muted);
  padding: 1.5rem;
  text-align: center;

  iframe {
    width: 100%;
    height: 260px;
    border: 0;
  }
`;

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const Contact = ({ contact, schoolName }) => {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Front-end only for now — wire to API when admissions endpoint ships.
    const payload = {
      school: schoolName,
      ...form,
      at: new Date().toISOString(),
    };
    try {
      const key = 'landingContactLeads';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
    } catch {
      /* ignore storage errors */
    }
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <Section id="contact">
      <Container>
        <Grid>
          <Reveal>
            <Eyebrow>GET IN TOUCH</Eyebrow>
            <Headline $max="12ch">We Would Love To Hear From You.</Headline>
            <Body>
              Visit us, call the admissions desk, or send a message — our team
              responds within one working day.
            </Body>
            <InfoList>
              <InfoItem>
                <div className="icon">
                  <FiMapPin aria-hidden />
                </div>
                <div>
                  <strong>Address</strong>
                  <span>{contact.address}</span>
                </div>
              </InfoItem>
              <InfoItem>
                <div className="icon">
                  <FiPhone aria-hidden />
                </div>
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                    {contact.phone}
                  </a>
                  {contact.phoneSecondary ? (
                    <>
                      <br />
                      <a
                        href={`tel:${contact.phoneSecondary.replace(/\s/g, '')}`}
                      >
                        {contact.phoneSecondary}
                      </a>
                    </>
                  ) : null}
                </div>
              </InfoItem>
              <InfoItem>
                <div className="icon">
                  <FiMail aria-hidden />
                </div>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </InfoItem>
              <InfoItem>
                <div className="icon">
                  <FiClock aria-hidden />
                </div>
                <div>
                  <strong>Working Hours</strong>
                  <span>{contact.hours}</span>
                </div>
              </InfoItem>
            </InfoList>
          </Reveal>

          <Reveal delay={0.06}>
            <FormCard onSubmit={onSubmit} noValidate>
              <Row>
                <Field>
                  Name
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </Field>
                <Field>
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </Field>
              </Row>
              <Row>
                <Field>
                  Phone
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+91 …"
                    autoComplete="tel"
                  />
                </Field>
                <Field>
                  Subject
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="Admissions enquiry"
                  />
                </Field>
              </Row>
              <Field>
                Message
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={onChange}
                  placeholder="How can we help?"
                />
              </Field>
              <BtnPrimary as="button" type="submit">
                Send Message
              </BtnPrimary>
              {sent ? (
                <Success>
                  <FiCheckCircle aria-hidden /> Thanks — we received your message.
                </Success>
              ) : null}
            </FormCard>
          </Reveal>
        </Grid>

        <MapWrap>
          {contact.mapEmbedUrl ? (
            <iframe
              title={`${schoolName} campus map`}
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div>
              <strong style={{ color: 'var(--lp-navy)', display: 'block' }}>
                {contact.address}
              </strong>
              Campus map placeholder — add `contact.mapEmbedUrl` per school slug.
            </div>
          )}
        </MapWrap>
      </Container>
    </Section>
  );
};

export default Contact;
