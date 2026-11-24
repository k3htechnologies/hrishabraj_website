
import React from "react";
import { sendEmail } from "@/shared/utils";

const Privacy: React.FC = () => {
  return (
    <section className="section" style={{ paddingTop: "100px" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="reveal" style={{ fontSize: "2.2rem" }}>
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-700 leading-7 text-[15px]">

          {/* About Us */}
          <section>
            <h2
              id="about-us"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              About us
            </h2>

            <p className="reveal">
              The website{" "}
              <a
                href="https://www.hrishabraj.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                www.hrishabraj.com
              </a>{" "}
              is owned, operated and managed by Rishabraj Estate
              Developers Private Limited, a company forming part of the
              H. Rishabraj Group, together with its group companies,
              including its affiliates, subsidiaries and associated entities
              (collectively referred to as the “H. Rishabraj Group”).
            </p>

            <p className="mt-3 reveal">
              For the purposes of these Terms of Use, Privacy Policy and
              Website Disclaimer, the expressions “H. Rishabraj Group”,
              “we”, “our” or “us” shall, wherever the context permits,
              refer to Rishabraj Estate Developers Private Limited and
              the relevant group entities.
            </p>
          </section>

          {/* Introduction */}
          <section>
            <h2
              id="introduction"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              Introduction
            </h2>

            <p className="reveal">
              H. Rishabraj Group respects the privacy of visitors to its
              official website and is committed to protecting the personal
              information shared with us.
            </p>

            <p className="mt-3 reveal">
              This Privacy Policy explains how we collect, use, process,
              store and protect personal information of individuals who
              visit our website, submit enquiries, express interest in our
              projects or communicate with us through our website or other
              digital communication channels.
            </p>

            <p className="mt-3 reveal">
              By accessing or using this website and voluntarily submitting
              your information, you acknowledge that you have read this
              Privacy Policy.
            </p>
          </section>

          {/* Applicable Laws */}
          <section>
            <h2
              id="applicable-laws"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              Applicable Data Protection Laws and Regulatory Framework
            </h2>

            <p className="reveal">
              H. Rishabraj Group is committed to handling personal information
              in accordance with applicable data protection and privacy laws
              in India, including the Digital Personal Data Protection Act,
              2023 (“DPDP Act”) and the Digital Personal Data Protection
              Rules, 2025 (“DPDP Rules”), to the extent applicable.
            </p>

            <p className="mt-3 reveal">
              The DPDP Act and the DPDP Rules have been brought into force
              in phases. H. Rishabraj Group shall comply with the provisions
              applicable from time to time, including provisions already
              in force and those that become effective on their respective
              notified commencement dates.
            </p>

            <p className="mt-3 reveal">
              Until the remaining provisions come into force, the collection,
              use, processing and protection of personal information shall
              continue to be governed by the applicable laws and regulations
              in force in India.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2
              id="information-collect"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              1. Information We Collect
            </h2>

            <p className="mb-4 reveal">
              Depending on the nature of your interaction with us, we may
              collect the following information:
            </p>

            <ul className="list-disc pl-6 space-y-3 marker:text-[#193b7d] reveal">
              <li>
                <strong>Personal Details:</strong> Name, age, residential
                address and other identification details voluntarily
                provided by you.
              </li>

              <li>
                <strong>Contact Details:</strong> Mobile number, email
                address and communication address.
              </li>

              <li>
                <strong>Enquiry Details:</strong> Information regarding
                your interest in our residential or commercial projects,
                redevelopment proposals, property requirements or other
                services.
              </li>

              <li>
                <strong>Professional or Business Details:</strong> Details
                shared by landowners, consultants, contractors, channel
                partners, society representatives and other business
                associates.
              </li>

              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, device information, website usage details and other
                technical information collected through cookies or similar
                technologies.
              </li>
            </ul>

            <p className="mt-4 reveal">
              We collect only such information as may be reasonably required
              for the purposes described in this Policy.
            </p>
          </section>

          {/* 2. Purpose of Collecting Information */}
          <section>
            <h2
              id="purpose"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              2. Purpose of Collecting Information
            </h2>

            <p className="mb-4 reveal">
              The information collected may be used for the following
              purposes:
            </p>

            <ul className="list-disc pl-6 space-y-2 marker:text-[#193b7d] reveal">
              <li>
                To respond to enquiries and requests submitted through
                our website.
              </li>
              <li>
                To provide information about our residential, commercial
                and redevelopment projects.
              </li>
              <li>
                To communicate project updates, construction progress,
                possession-related information and other relevant
                developments.
              </li>
              <li>
                To understand customer requirements and provide
                appropriate assistance.
              </li>
              <li>
                To facilitate communication with prospective customers,
                existing customers, society members, landowners and
                business associates.
              </li>
              <li>
                To send communications, newsletters, promotional information
                and project announcements, subject to applicable consent
                requirements.
              </li>
              <li>
                To improve our website, services, customer experience
                and business operations.
              </li>
              <li>
                To comply with applicable legal, regulatory and statutory
                requirements.
              </li>
            </ul>
          </section>

          {/* 3. WhatsApp Communication */}
          <section>
            <h2
              id="whatsapp-communication"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              3. WhatsApp Communication and Automated Chatbot Services
            </h2>

            <ul className="list-disc pl-6 space-y-3 marker:text-[#193b7d] reveal">
              <li>
                H. Rishabraj Group may communicate with visitors, prospective
                customers, existing customers, society members and other
                individuals through WhatsApp, website chatbots and other
                digital communication channels. Such communication may be
                facilitated through automated assistants, chatbots or other
                technology-enabled systems.
              </li>

              <li>
                Any information voluntarily shared by users through such
                communication channels may be collected and processed for
                the purposes of responding to enquiries, providing
                project-related information, facilitating customer
                assistance and other legitimate business purposes, subject
                to this Privacy Policy and applicable laws.
              </li>

              <li>
                Users are advised not to disclose sensitive personal or
                financial information through such automated communication
                channels, including Aadhaar numbers, PAN details, bank
                account details, debit or credit card information, passwords,
                PINs or One-Time Passwords (OTPs). H. Rishabraj Group shall
                not request such confidential information through its
                automated assistants or chatbots.
              </li>

              <li>
                Promotional and marketing communications through WhatsApp
                or other digital channels shall be undertaken only where
                the user has separately provided the requisite consent or
                opted in to receive such communications. Users may withdraw
                such consent at any time through the applicable communication
                channel or by contacting H. Rishabraj Group using the
                contact details provided herein.
              </li>
            </ul>
          </section>

          {/* 4. Sharing of Information */}
          <section>
            <h2
              id="sharing-information"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              4. Sharing of Information
            </h2>

            <p className="reveal">
              H. Rishabraj Group does not intend to sell or commercially
              trade personal information collected through its website
              project landing pages, social media and/or digital advertising
              platforms to third parties.
            </p>

            <p className="mt-3 mb-4 reveal">
              However, some information may be shared, wherever necessary
              and lawful, with:
            </p>

            <ul className="list-disc pl-6 space-y-2 marker:text-[#193b7d] reveal">
              <li>
                Companies, subsidiaries, affiliates and associated entities
                forming part of the Group.
              </li>
              <li>
                Authorised employees and internal departments for business
                and customer communication purposes.
              </li>
              <li>
                Consultants, architects, legal advisors, project management
                consultants and other professional service providers.
              </li>
              <li>
                Technology service providers, website administrators and
                IT support agencies.
              </li>
              <li>
                Government authorities, statutory bodies, regulatory
                authorities and law enforcement agencies, wherever required
                under applicable law.
              </li>
            </ul>

            <p className="mt-4 reveal">
              Any such sharing shall be limited to legitimate business,
              operational or legal purposes, subject to applicable
              requirements.
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2
              id="cookies"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              5. Cookies and Website Analytics
            </h2>

            <p className="reveal">
              Our website may use cookies and similar technologies to
              improve website functionality, understand visitor preferences,
              analyse website traffic and enhance the browsing experience.
            </p>

            <p className="mt-3 reveal">
              Visitors may manage or restrict cookies through their respective
              browser settings. However, disabling certain cookies may affect
              the functionality of some website features.
            </p>
          </section>

          {/* 6. Data Security */}
          <section>
            <h2
              id="data-security"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              6. Data Security and Retention
            </h2>

            <p className="reveal">
              We take reasonable technical and organisational measures
              to protect personal information against unauthorised access,
              misuse, alteration, disclosure or loss.
            </p>

            <p className="mt-3 reveal">
              Personal information shall be retained only for such period
              as may be reasonably necessary for the purpose for which
              it was collected or as required under applicable laws,
              regulations and statutory obligations.
            </p>
          </section>

          {/* 7. Third-Party Websites */}
          <section>
            <h2
              id="third-party-websites"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              7. Third-Party Websites and Services:
            </h2>

            <p className="reveal">
              Our website and services may contain links to third-party
              websites, landing pages, WhatsApp bots, portals or services
              for the convenience of visitors and the visitors are advised
              to review the applicable disclaimer, privacy policy and terms
              and conditions of such third-party websites before engaging,
              using or viewing their websites.
            </p>

            <p className="mt-3 reveal">
              H. Rishabraj Group does not control the privacy practices,
              content or security arrangements of such third-party websites
              and shall not be responsible for their policies or practices.
              Visitors are advised to review the applicable privacy policies
              of such websites independently.
            </p>
          </section>

          {/* 8. Rights and Requests */}
          <section>
            <h2
              id="rights-requests"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              8. Rights and Requests of Individuals
            </h2>

            <p className="reveal">
              Subject to applicable data protection and privacy laws in
              India, individuals may exercise the rights available to them
              in relation to their personal information, including requesting
              access to, correction or updating of, or erasure of their
              personal information, wherever applicable.
            </p>

            <p className="mt-3 reveal">
              Where the processing of personal information is based on
              consent, individuals may withdraw such consent at any time
              through the applicable communication channel or by contacting
              H. Rishabraj Group. Such withdrawal shall not affect the
              lawfulness of processing carried out prior to the withdrawal
              of consent or any processing that is otherwise permitted
              or required under applicable law.
            </p>

            <p className="mt-3 reveal">
              Individuals may also raise concerns or submit requests
              relating to the collection, use, processing or handling
              of their personal information by writing to H. Rishabraj
              Group at{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => sendEmail("info@hrishabraj.com")}
              >
                info@hrishabraj.com
              </span>.
            </p>

            <p className="mt-3 reveal">
              Any such request should clearly specify the nature of the
              request and the personal information concerned. H. Rishabraj
              Group may seek additional information, wherever necessary,
              to verify the identity of the individual making the request
              and to process the request appropriately.
            </p>

            <p className="mt-3 reveal">
              H. Rishabraj Group shall review and address such requests
              in accordance with applicable laws and regulations and
              within the prescribed timelines, wherever applicable.
              Certain requests may be subject to legal, regulatory,
              contractual or other lawful retention requirements.
            </p>
          </section>

          {/* 9. Changes to Privacy Policy */}
          <section>
            <h2
              id="policy-changes"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              9. Changes to This Privacy Policy
            </h2>

            <p className="reveal">
              H. Rishabraj Group reserves the right to modify, amend
              or update this Privacy Policy from time to time to reflect
              changes in business practices, website functionality
              or applicable laws and regulations.
            </p>

            <p className="mt-3 reveal">
              Any revised version shall be published on this website
              with the updated revision date.
            </p>
          </section>

          {/* Grievance Redressal */}
          <section>
            <h2
              id="grievance"
              className="reveal"
              style={{ fontSize: "1.5rem", marginTop: "3rem" }}
            >
              Grievance Redressal – Personal Data
            </h2>

            <p className="reveal">
              For any grievance, complaint or concern relating to the
              collection, use, processing or handling of personal data
              under this Privacy Policy, individuals may contact
              H. Rishabraj Group at:
            </p>

            <div className="mt-5 space-y-3">
              <p className="reveal">
                <strong>Email:</strong>{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => sendEmail("info@hrishabraj.com")}
                >
                  info@hrishabraj.com
                </span>
              </p>

              <p className="reveal">
                <strong>Address:</strong> 103, Jai Tirth, Daulat Nagar,
                Road No. 10, Borivali (East), Mumbai – 400066,
                Maharashtra, India.
              </p>
            </div>

            <p className="mt-4 reveal">
              The Company shall review and address such grievances
              in accordance with applicable data protection and privacy
              laws and within the prescribed timelines, wherever applicable.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
};

export default Privacy;
