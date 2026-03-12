import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <nav className="bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/[0.06] fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img src="/blog.png" alt="blogify" className="h-10 w-14 object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Blogify
              </span>
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] px-6 py-2.5 rounded-xl font-medium transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="privacy-content">
            <h1 className="text-5xl font-bold text-white/90 mb-4">Privacy Policy</h1>
            <p className="last-updated text-white/40 mb-8">Last Updated: January 18, 2026</p>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">1. Introduction</h2>
              <p className="text-white/60 leading-relaxed">
                Welcome to Blogify. We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our blogging services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">2. Information We Collect</h2>

              <h3 className="text-2xl font-semibold text-white/80 mb-3">2.1 Personal Information</h3>
              <p className="text-white/60 mb-3">We collect the following personal information from you:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Name:</strong> Collected during registration to personalize your account and display as the blog author</li>
                <li><strong>Email Address:</strong> Used for account authentication, password recovery, email verification, and sending you important notifications about your account</li>
                <li><strong>Password:</strong> Securely stored to authenticate your account access</li>
                <li><strong>Profile Information:</strong> Optional biographical details and profile pictures you choose to add</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white/80 mb-3">2.2 Blog Content</h3>
              <p className="text-white/60 mb-3">We collect and store:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Blog Posts:</strong> All text, markdown content, and articles you create and publish</li>
                <li><strong>Blog Metadata:</strong> Publication dates, categories, tags, and revision history</li>
                <li><strong>Comments:</strong> User comments and discussions on your blog posts</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white/80 mb-3">2.3 Uploaded Media</h3>
              <p className="text-white/60 mb-3">We collect and store:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Images and Files:</strong> Any images, documents, or media files you upload to use in your blog posts</li>
                <li><strong>File Information:</strong> File names, types, sizes, and upload timestamps</li>
                <li><strong>Image Metadata:</strong> Technical information about uploaded images (dimensions, format, etc.)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white/80 mb-3">2.4 Usage Data</h3>
              <p className="text-white/60 mb-3">We automatically collect:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Browser Information:</strong> Browser type, version, and operating system</li>
                <li><strong>IP Address:</strong> Your Internet Protocol address for security and analytics purposes</li>
                <li><strong>Activity Logs:</strong> Pages visited, time spent on pages, and interactions with our platform</li>
                <li><strong>Device Information:</strong> Device type, screen resolution, and unique device identifiers</li>
                <li><strong>Referral Source:</strong> How you accessed our site (search engines, direct links, social media, etc.)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white/80 mb-3">2.5 Cookies and Tracking Technologies</h3>
              <p className="text-white/60 mb-3">We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li>Remember your login information and preferences</li>
                <li>Track your session on our platform</li>
                <li>Analyze usage patterns and improve our services</li>
                <li>Personalize your experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">3. How We Use Your Information</h2>
              <p className="text-white/60 mb-3">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Account Management:</strong> Creating and maintaining your account, authentication, and password recovery</li>
                <li><strong>Service Delivery:</strong> Providing blogging functionality, publishing tools, and content management</li>
                <li><strong>Communication:</strong> Sending important updates, security alerts, and service announcements</li>
                <li><strong>Analytics:</strong> Understanding how users interact with our platform to improve features and performance</li>
                <li><strong>Security:</strong> Protecting against fraudulent activities, unauthorized access, and maintaining platform security</li>
                <li><strong>Legal Compliance:</strong> Meeting legal obligations and resolving disputes</li>
                <li><strong>Marketing:</strong> With your consent, sending promotional content and newsletters</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-white/60 mb-3">We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and conducting our business (hosting providers, email services, payment processors)</li>
                <li><strong>Cloud Storage:</strong> Your blog content and media files are stored on secure cloud servers (Cloudinary for image hosting)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government requests</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale, your information may be transferred</li>
                <li><strong>Public Content:</strong> Any blog posts you publish are publicly visible and can be shared across the internet</li>
              </ul>
              <p className="text-white/60"><strong>We do not sell your personal information to third parties for marketing purposes.</strong></p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">5. Data Security</h2>
              <p className="text-white/60 mb-3">
                We implement comprehensive security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Password hashing and secure storage practices</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Limited access to personal information by authorized employees only</li>
                <li>Secure database encryption for sensitive data</li>
              </ul>
              <p className="text-white/60">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">6. Data Retention</h2>
              <p className="text-white/60">
                We retain your personal information for as long as your account is active and for a reasonable period afterward for legal, backup, and archival purposes. You may request deletion of your account and associated data at any time by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">7. Your Privacy Rights</h2>
              <p className="text-white/60 mb-3">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 text-white/60 mb-6">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request that we update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information (right to be forgotten)</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for specific data processing activities</li>
              </ul>
              <p className="text-white/60">To exercise any of these rights, please contact us at <strong>blogify-privacy@surajitsen.live</strong></p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">8. Third-Party Links</h2>
              <p className="text-white/60">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">9. Children's Privacy</h2>
              <p className="text-white/60">
                Blogify is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information and terminate the child's account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">10. International Data Transfers</h2>
              <p className="text-white/60">
                Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws different from your home country. By using our services, you consent to the transfer of your information to countries outside your country of residence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white/90 mb-4">11. Updates to This Privacy Policy</h2>
              <p className="text-white/60">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any modifications signifies your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white/90 mb-4">12. Contact Us</h2>
              <p className="text-white/60 mb-3">If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
              <div className="bg-white/[0.04] p-6 rounded-xl border border-white/[0.06]">
                <p className="text-white/60"><strong>Blogify Support Team</strong></p>
                <p className="text-white/60">Email: blogify-privacy@surajitsen.live </p>
                <p className="text-white/60">Website: blogify.surajitsen.live</p>
              </div>
            </section>

            <footer className="border-t border-white/[0.06] pt-8 mt-12">
              <p className="text-center text-white/40">&copy; 2026 Blogify. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
