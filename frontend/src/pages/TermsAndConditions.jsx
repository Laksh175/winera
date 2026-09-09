import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import aboutHeroBg from '../assets/about-hero-bg.webp';

export default function TermsAndConditions({ siteData }) {
  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const termsSeo = siteData?.termsSeo || {
    pageTitle: "Terms & Conditions | Winera International Pvt. Ltd.",
    metaDescription: "Read Winera International's Terms & Conditions outlining guidelines, responsibilities, project process, warranty, and legal agreements."
  };

  useEffect(() => {
    document.title = termsSeo.pageTitle || termsSeo.title || "Terms & Conditions | Winera International Pvt. Ltd.";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', termsSeo.metaDescription || termsSeo.description || "Read Winera International's Terms & Conditions outlining guidelines, responsibilities, project process, warranty, and legal agreements.");
  }, [termsSeo]);

  const defaultSections = [
    {
      number: "1",
      title: "About Winera International Pvt. Ltd.",
      intro: "Winera International Pvt. Ltd., incorporated under the Companies Act, 1956, with registered office at 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat 395006, India, is a leading B2B turnkey entertainment solutions provider. Our services include:",
      bulletsText: [
        "Indoor soft play zones",
        "Trampoline parks and ninja courses",
        "Arcade and video game machine installations",
        "VR/AR entertainment zones",
        "Bowling alleys, bumper cars, laser tag setups",
        "Customized commercial play and recreation areas"
      ]
    },
    {
      number: "2",
      title: "Scope of Agreement",
      content: [
        "These Terms apply to all interactions, transactions, proposals, quotations, and contracts made through the Site or directly with the Company. These Terms do not override signed project-specific contracts; however, in case of conflict, the mutually signed agreement shall take precedence."
      ]
    },
    {
      number: "3",
      title: "Use of the Website",
      bulletsText: [
        "You agree to access this Site lawfully and only for legitimate business purposes.",
        "Unauthorized use of this Site may give rise to claims for damages and/or be a criminal offense.",
        "You may not attempt to gain unauthorized access to our systems or data, use this Site to copy, store, transmit, or distribute malicious software, or scrape, crawl, or collect user data without permission."
      ]
    },
    {
      number: "4",
      title: "Quotations, Proposals & Pricing",
      bulletsText: [
        "All quotations are non-binding until confirmed through a signed purchase/work order.",
        "Quotes are valid for 30 days unless otherwise stated in writing.",
        "All pricing is in Indian Rupees (INR) and exclusive of applicable taxes, duties, and levies.",
        "Price revisions may occur due to changes in raw material costs, design alterations, or import duties."
      ]
    },
    {
      number: "5",
      title: "Project Process & Order Confirmation",
      intro: "Projects commence only after receiving signed approval on quotation/design/BOQ and advance payment as per agreed terms.",
      bulletsText: [
        "The project is broken into phases: Design → Production → Dispatch → Installation → Handover.",
        "Project-specific responsibilities (like flooring, lighting, or electrical setup) must be completed by the client before installation begins."
      ]
    },
    {
      number: "6",
      title: "Payment Terms",
      intro: "Unless otherwise specified, standard payment milestones are:",
      bulletsText: [
        "50% of the total project value is payable in advance.",
        "40% before shipment or dispatch from factory.",
        "10% upon final handover and acceptance.",
        "No shipment or site work will begin without receipt of due payments.",
        "Delay in payment will lead to additional storage, demurrage, or interest charges (typically 1.5% per month).",
        "Payments must be made to official bank accounts listed on company invoices."
      ]
    },
    {
      number: "7",
      title: "Delivery & Logistics",
      bulletsText: [
        "Delivery timelines are indicative and commence only after design approval and advance receipt.",
        "Unexpected delays (strikes, customs clearance, shipping issues, etc.) will be communicated but shall not be grounds for penalty unless otherwise agreed.",
        "Risk of goods passes to the client upon dispatch from our warehouse.",
        "Insurance, if required, must be arranged by the client or requested in writing."
      ]
    },
    {
      number: "8",
      title: "Installation & Site Readiness",
      intro: "Winera provides installation services as part of turnkey projects.",
      bulletsText: [
        "Client responsibilities: Ensure access to the site during business hours, provide civil-ready conditions (flooring, walls, electric points, etc.), and provide accommodation or local logistics for installation crew in remote locations (as per mutual agreement).",
        "Any re-visits or delays due to client-side unpreparedness will be chargeable."
      ]
    },
    {
      number: "9",
      title: "Warranty & Maintenance",
      intro: "A standard 12-month manufacturer’s warranty is provided from date of installation.",
      bullets: [
        { label: "Coverage includes", text: "Structural integrity, weld failures, and manufacturing defects in supplied components." },
        { label: "Exclusions include", text: "Misuse, vandalism, natural disasters, water/fire/electrical damage, third-party installations or repairs, and consumables / wear-and-tear parts (nets, ropes, foam padding, etc.)." },
        { label: "AMC", text: "Post-warranty AMC (Annual Maintenance Contract) is available for a fee." }
      ]
    },
    {
      number: "10",
      title: "Design, Drawing & Intellectual Property",
      bulletsText: [
        "All designs, layouts, 3D renders, and proposals remain the intellectual property of Winera unless transferred by written agreement.",
        "No reuse, reproduction, or sharing is permitted without our written consent.",
        "Breach of this clause may result in legal action and claims for damages."
      ]
    },
    {
      number: "11",
      title: "Modifications & Customization",
      bulletsText: [
        "Clients may request minor customizations post-design approval; these will be accommodated if feasible.",
        "Major changes post-approval may involve additional cost and timeline revisions.",
        "Requests must be made in writing and approved by both parties."
      ]
    },
    {
      number: "12",
      title: "Cancellation & Refund Policy",
      bulletsText: [
        "Cancellation before production begins will attract a minimum 10% administrative fee.",
        "Once manufacturing or procurement has commenced, no refund will be issued.",
        "Refunds (where applicable) will be processed within 30 working days after due verification."
      ]
    },
    {
      number: "13",
      title: "Limitation of Liability",
      intro: "Winera shall not be liable for indirect or consequential losses, loss of business, revenue, or reputation, or delays due to force majeure or third-party vendors.",
      content: [
        "Maximum liability is capped at the total value of the product/service provided in the dispute."
      ]
    },
    {
      number: "14",
      title: "Subcontractors & Third Parties",
      content: [
        "We may use subcontractors or third-party service providers for part of the project (e.g., transport, electrical work). While we take care in selection, Winera is not liable for direct performance of subcontractors unless contractually stated."
      ]
    },
    {
      number: "15",
      title: "Confidentiality & Data Protection",
      bulletsText: [
        "All discussions, documents, drawings, client lists, and pricing details shared between Winera and the client are confidential.",
        "Each party agrees to use such data only for the intended project and not disclose to third parties without consent.",
        "Winera maintains strict cybersecurity and GDPR-compliant (where applicable) data handling protocols."
      ]
    },
    {
      number: "16",
      title: "Force Majeure",
      content: [
        "Winera shall not be liable for failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, war, fire, pandemics, strikes, shipping delays, embargoes, or government orders."
      ]
    },
    {
      number: "17",
      title: "Termination",
      subtitle: "Winera reserves the right to terminate any contract if:",
      bulletsText: [
        "The client breaches material terms of the agreement.",
        "Payments are withheld or delayed beyond agreed terms.",
        "The client is found engaging in fraudulent, unethical, or harmful business practices."
      ]
    },
    {
      number: "18",
      title: "Governing Law & Jurisdiction",
      bulletsText: [
        "These Terms shall be governed by and construed in accordance with the laws of the Republic of India.",
        "Any disputes or legal claims shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat."
      ]
    },
    {
      number: "19",
      title: "Revisions and Updates",
      content: [
        "These Terms may be updated periodically to reflect changes in law or business operations. Continued use of the Site or Services after updates will constitute acceptance of the revised Terms."
      ]
    }
  ];

  const sections = (siteData?.termsSections && siteData.termsSections.length > 0) ? siteData.termsSections : defaultSections;

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif" }}>
      <Header headerData={header} />

      {/* Hero Header Section matching AboutUs.jsx */}
      <section className="winera-vr-hero-section" style={{
        position: 'relative', width: '100%', paddingTop: '165px', paddingBottom: '50px',
        background: `url(${aboutHeroBg}) center/100% 100% no-repeat`, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.0rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px', lineHeight: 1.15 }}>
            Terms & <span style={{ color: '#ffcd00' }}>Conditions</span>
          </h1>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffcd00' }}>&gt;</span>
            <span style={{ color: '#ffffff' }}>Terms & Conditions</span>
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section style={{ padding: '60px 4vw 90px', maxWidth: '940px', margin: '0 auto' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid #e2e8f0',
          padding: '40px 45px',
          boxShadow: 'none'
        }}>

          {/* Preamble */}
          <div style={{ marginBottom: '32px', paddingBottom: '28px', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', margin: '0 0 10px' }}>
              Winera International Pvt. Ltd.
            </h2>
            <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.75, margin: 0, fontWeight: '450' }}>
              These Terms and Conditions (“Agreement”, “Terms”) govern your (“you”, “your”, “client”, “customer”) access to and use of the website <a href="http://www.winera.in" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>www.winera.in</a> (the “Site”), and the products and services (“Services”) offered by Winera International Pvt. Ltd. (“Company”, “Winera”, “we”, “our”, or “us”). By accessing or using our Site and/or Services, you agree to be legally bound by these Terms. If you do not agree, please do not use this Site or engage with our services.
            </p>
          </div>

          {/* Render Sections 1 to 19 */}
          {sections.map((sec, idx) => (
            <div key={idx} style={{
              marginBottom: idx === sections.length - 1 ? '40px' : '36px',
              paddingBottom: idx === sections.length - 1 ? '0' : '32px',
              borderBottom: idx === sections.length - 1 ? 'none' : '1px solid #f1f5f9'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                color: '#0f172a',
                margin: '0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                lineHeight: 1.3
              }}>
                <span style={{
                  background: '#e0f2fe',
                  color: '#0284c7',
                  borderRadius: '10px',
                  width: '32px',
                  height: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>
                  {sec.number}
                </span>
                {sec.title}
              </h3>

              {sec.intro && (
                <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, margin: '0 0 12px', fontWeight: '450' }}>
                  {sec.intro}
                </p>
              )}

              {sec.content && sec.content.map((pText, pIdx) => (
                <p key={pIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, margin: '0 0 10px', fontWeight: '450' }}>
                  {pText}
                </p>
              ))}

              {sec.subtitle && (
                <p style={{ fontSize: '14.5px', color: '#334155', fontWeight: '600', margin: '0 0 12px', lineHeight: 1.6 }}>
                  {sec.subtitle}
                </p>
              )}

              {/* Labelled bullets */}
              {sec.bullets && (
                <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
                  {sec.bullets.map((bItem, bIdx) => (
                    <li key={bIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, marginBottom: '8px' }}>
                      <strong style={{ color: '#0f172a', fontWeight: '700' }}>{bItem.label}:</strong> {bItem.text}
                    </li>
                  ))}
                </ul>
              )}

              {/* Simple text bullets */}
              {sec.bulletsText && (
                <ul style={{ margin: 0, paddingLeft: '22px', listStyleType: 'disc' }}>
                  {sec.bulletsText.map((tItem, tIdx) => (
                    <li key={tIdx} style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.7, marginBottom: '8px' }}>
                      {tItem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Section 20: Contact Us Box */}
          <div style={{
            background: '#f0f9ff',
            border: '1.5px solid #38bdf8',
            borderRadius: '20px',
            padding: '30px 32px',
            marginTop: '20px'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#0f172a',
              margin: '0 0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                background: '#38bdf8',
                color: '#ffffff',
                borderRadius: '10px',
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '800',
                flexShrink: 0
              }}>
                20
              </span>
              Contact Us
            </h3>
            <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, fontWeight: '500' }}>
              <p style={{ margin: '0 0 8px', fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>
                Winera International Pvt. Ltd.
              </p>
              <p style={{ margin: '0 0 12px', maxWidth: '720px' }}>
                📍 1011, 10th floor, Millennium Business Hub, opp., Bhagavan Nagar, Sarthana Jakat Naka, Nature Park and Zoo, Nana Varachha, Surat, Gujarat-395006, India
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '10px' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>📧 Email:</strong>{' '}
                  <a href="mailto:info@winera.in" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                    info@winera.in
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>📞 Phone:</strong>{' '}
                  <a href="tel:+919428989488" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                    +91 94289 89488
                  </a>
                  {' / '}
                  <a href="tel:+919512356766" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                    +91 95123 56766
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>🌐 Website:</strong>{' '}
                  <a href="https://www.winera.in" target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                    www.winera.in
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer footerData={footer} />
    </div>
  );
}
