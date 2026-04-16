import Link from "next/link";
import WoodgrainBG from "./WoodgrainBG";

const lastUpdated = "April 16, 2026";

const sections = [
  {
    title: "Overview",
    body: [
      "This privacy policy applies to the iOS version of Tessel Run, a game from Woodcraft Sounds.",
      "Tessel Run does not require an account. Woodcraft Sounds does not ask you to provide your name, email address, phone number, location, contacts, photos, or other personal information in order to play.",
    ],
  },
  {
    title: "App Store Privacy Summary",
    body: [
      "Data used to track you: none.",
      "Data linked to you: none collected by Woodcraft Sounds through Tessel Run.",
      "Data not linked to you: none collected by Woodcraft Sounds through Tessel Run.",
      "Tessel Run does not use third-party advertising SDKs, third-party analytics SDKs, or tracking technologies.",
    ],
  },
  {
    title: "Information We Collect",
    body: [
      "Woodcraft Sounds does not directly collect personal information through the iOS app.",
      "Tessel Run may save gameplay data, scores, progress, settings, and preferences locally on your iPhone or iPad so the game can work as expected. This local data stays on your device unless you delete the app, reset the data, or your Apple device backs it up according to your iCloud and device settings.",
    ],
  },
  {
    title: "Apple Services",
    body: [
      "When you download, purchase, update, or use Tessel Run through Apple services, Apple may process information such as your Apple ID, purchase history, device details, crash reports, diagnostics, and App Store usage information according to Apple's privacy policy and your Apple account settings.",
      "If you choose to share app analytics with developers in iOS settings, Apple may provide Woodcraft Sounds with crash logs or diagnostic information to help improve app stability. These reports are provided through Apple's developer tools and are not used to identify you.",
    ],
  },
  {
    title: "Tracking, Ads, and Sharing",
    body: [
      "Tessel Run does not track you across apps or websites owned by other companies.",
      "Tessel Run does not serve third-party ads, does not sell personal information, and does not share personal information with data brokers.",
      "Tessel Run does not request access to device permissions such as Location, Contacts, Photos, Camera, Microphone, or Bluetooth.",
    ],
  },
  {
    title: "Privacy Policy Website",
    body: [
      "When you visit this privacy policy page, your browser and the site's hosting provider may process standard technical information needed to load the page, such as IP address, browser type, requested URL, and timestamps.",
      "This website is used to provide basic information and policy pages. It does not ask visitors to submit personal information.",
    ],
  },
  {
    title: "Children",
    body: [
      "Tessel Run is not designed to collect personal information from children. If you believe a child has provided personal information to Woodcraft Sounds, please contact us so we can review the request and delete the information if needed.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "Because Woodcraft Sounds does not directly collect personal information through Tessel Run, there is no personal account data retained by Woodcraft Sounds for the iOS app.",
      "Local game data remains on your device until you delete it, reset it, or remove the game, subject to your device and platform backup settings.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If Tessel Run adds iOS features that change how information is handled, such as accounts, Game Center features, online leaderboards, analytics, ads, cloud saves, or in-app purchases, this policy will be updated to explain those changes.",
      "The updated policy will be posted on this page with a new last updated date.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Questions about this privacy policy can be sent to Woodcraft Sounds through the contact information available at micaharvey.com.",
    ],
  },
];

export default function TesselRunPrivacyPolicy() {
  const wrap: React.CSSProperties = {
    minHeight: "100dvh",
    padding: "4rem 1.25rem",
    background:
      "radial-gradient(42vmax 42vmax at 70% 18%, rgba(255,200,255,.18), transparent), radial-gradient(38vmax 38vmax at 18% 75%, rgba(200,240,255,.18), transparent)",
  };
  const shell: React.CSSProperties = {
    width: "min(860px, 100%)",
    margin: "0 auto",
    color: "#eee",
  };
  const panel: React.CSSProperties = {
    padding: "2.25rem",
    borderRadius: 12,
    background: "rgba(20, 14, 10, 0.7)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.28)",
    backdropFilter: "blur(8px)",
  };
  const eyebrow: React.CSSProperties = {
    color: "#cbd5e1",
    fontSize: ".9rem",
    marginBottom: ".5rem",
  };
  const h1: React.CSSProperties = {
    margin: 0,
    color: "#f8fafc",
    fontSize: "clamp(2rem, 5vw, 3.25rem)",
    lineHeight: 1.05,
  };
  const intro: React.CSSProperties = {
    marginTop: "1rem",
    color: "#d6d3d1",
    fontSize: "1.05rem",
    lineHeight: 1.65,
  };
  const sectionStyle: React.CSSProperties = {
    marginTop: "2rem",
  };
  const h2: React.CSSProperties = {
    color: "#f8fafc",
    fontSize: "1.25rem",
    marginBottom: ".75rem",
  };
  const p: React.CSSProperties = {
    color: "#d6d3d1",
    lineHeight: 1.7,
    marginTop: ".75rem",
  };
  const link: React.CSSProperties = {
    color: "#93c5fd",
    textDecoration: "underline",
    textUnderlineOffset: 4,
  };

  return (
    <main style={wrap}>
      <WoodgrainBG />
      <article style={shell}>
        <div style={panel}>
          <p style={eyebrow}>Woodcraft Sounds</p>
          <h1 style={h1}>Tessel Run iOS Privacy Policy</h1>
          <p style={intro}>Last updated: {lastUpdated}</p>

          {sections.map((section) => (
            <section key={section.title} style={sectionStyle}>
              <h2 style={h2}>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} style={p}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p style={{ ...p, marginTop: "2.5rem" }}>
            <Link href="/" style={link}>
              Back to Woodcraft Sounds
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
