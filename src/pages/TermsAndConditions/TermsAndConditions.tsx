
import React from "react";
import { termsAndConditionssections } from "./data/termsAndConditions";

const TermsAndCondition: React.FC = () => {
  return (
    <section className="section" style={{ paddingTop: "100px" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="reveal" style={{ fontSize: "2.2rem" }}>
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-gray-700 leading-7 text-[15px]">
          {termsAndConditionssections.map((section, index) => (
            <section key={index}>
              <h2
                className="reveal"
                style={{ fontSize: "1.5rem", marginTop: "3rem" }}
              >
                {section.title}
              </h2>

              {section.paragraphs?.map((paragraph, i) => (
                <p
                  key={i}
                  className={`reveal ${i > 0 ? "mt-3" : ""}`}
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="list-disc pl-6 mt-3 space-y-2 marker:text-[#193b7d] reveal">
                  {section.bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.lettered && (
                <ol className="list-[lower-alpha] pl-6 mt-3 space-y-2 marker:text-gray-700 reveal">
                  {section.lettered.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              )}

              {section.after?.map((paragraph, i) => (
                <p key={i} className="mt-3 reveal">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsAndCondition;
