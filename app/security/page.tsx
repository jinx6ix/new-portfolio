import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Policy',
  description: 'Security policy for this website',
};

export default function SecurityPolicy() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>Security Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, including:</p>
        <ul>
          <li>Contact information (name, email, phone number)</li>
          <li>Payment information (processed securely via third-party providers)</li>
          <li>Usage data and analytics (anonymized where possible)</li>
        </ul>

        <h2>How We Protect Your Data</h2>
        <ul>
          <li>Passwords are hashed using SHA-256 with peppering</li>
          <li>All data transmitted over HTTPS/TLS</li>
          <li>Session cookies are HttpOnly and Secure</li>
          <li>Rate limiting on authentication endpoints</li>
          <li>SQL injection prevention via parameterized queries</li>
        </ul>

        <h2>Contact</h2>
        <p>For security concerns, contact us through our security disclosure process.</p>
      </div>
    </div>
  );
}